const fs = require("fs");
const path = require("path");
const VideoNews = require("../../models/news/VideoNews");
const NewsPageSetting = require("../../models/news/NewsPageSetting");
const { uploadBuffer, removeImage } = require("../../config/cloudinary");
const { getPagination } = require("../../utils/pagination");

function removeUpload(file) {
  if (!file || !file.startsWith("/uploads/news/")) return;
  fs.unlink(path.join(__dirname, "..", "..", file.slice(1)), () => {});
}

function safeExternalUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  let url;
  try {
    url = new URL(raw);
  } catch (_) {
    throw new Error("Enter a valid external news URL.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("External news links must use HTTP or HTTPS.");
  }

  return url.toString();
}

function safeImageUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  let url;
  try {
    url = new URL(raw);
  } catch (_) {
    throw new Error("Enter a valid hosted image URL.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Hosted image URLs must use HTTP or HTTPS.");
  }
  return url.toString();
}

function renderEditor(res, item, error, status = 200) {
  return res.status(status).render("admin/news/editor", {
    title: item?._id ? "Edit News" : "Create News",
    item,
    error,
    currentPath: "/admin/video_news",
  });
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function searchFilter(query) {
  if (typeof query !== "string" || !query.trim()) return null;

  const search = { $regex: escapeRegex(query.trim().slice(0, 100)), $options: "i" };
  return {
    $or: [
      { title: search },
      { source: search },
      { summary: search },
    ],
  };
}

exports.adminList = async (req, res, next) => {
  try {
    const filter = {};

    if (["Digital Media", "Print Media"].includes(req.query.category)) {
      filter.category = req.query.category;
    }
    if (req.query.status === "published") filter.published = true;
    if (req.query.status === "draft") filter.published = false;

    const search = searchFilter(req.query.q);
    if (search) Object.assign(filter, search);

    const [total, totalAll, publishedCount, draftCount, featuredCount, highlightedCount, newsPageSetting] = await Promise.all([
      VideoNews.countDocuments(filter),
      VideoNews.countDocuments(),
      VideoNews.countDocuments({ published: true }),
      VideoNews.countDocuments({ published: false }),
      VideoNews.countDocuments({ featured: true }),
      VideoNews.countDocuments({ $or: [{ isHighlighted: true }, { featured: true }] }),
      NewsPageSetting.findOne({ key: "news-page" }).lean(),
    ]);
    const pagination = getPagination(req.query.page, total, 50);
    const news = await VideoNews.find(filter)
      .sort({ updatedAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize)
      .lean();
    res.render("admin/news/index", {
      title: "News & Press",
      news,
      pagination,
      paginationPath: "/admin/video_news",
      paginationQuery: {
        q: typeof req.query.q === "string" ? req.query.q.trim().slice(0, 100) : "",
        category: ["Digital Media", "Print Media"].includes(req.query.category) ? req.query.category : "",
        status: ["published", "draft"].includes(req.query.status) ? req.query.status : "",
      },
      stats: { total: totalAll, published: publishedCount, drafts: draftCount, featured: featuredCount, highlighted: highlightedCount },
      filters: {
        q: typeof req.query.q === "string" ? req.query.q.slice(0, 100) : "",
        category: ["Digital Media", "Print Media"].includes(req.query.category) ? req.query.category : "",
        status: ["published", "draft"].includes(req.query.status) ? req.query.status : "",
      },
      currentPath: "/admin/video_news",
      newsPageSetting,
      posterError: req.query.posterError || "",
      query: req.query,
    });
  } catch (error) {
    next(error);
  }
};

exports.saveHeroPoster = async (req, res, next) => {
  const file = req.file;
  try {
    const hostedPoster = safeImageUrl(req.body.heroPosterUrl);
    if (!file && !hostedPoster) {
      return res.redirect("/admin/video_news?posterError=Choose%20a%20hosted%20image%20URL%20or%20upload%20an%20image.");
    }
    const uploaded = file
      ? await uploadBuffer(file.buffer, "nishad-yatra/news/hero")
      : null;
    const posterPath = hostedPoster || uploaded.secure_url;
    const previous = await NewsPageSetting.findOne({ key: "news-page" });
    const previousPath = previous?.heroPosterPath;
    await NewsPageSetting.findOneAndUpdate(
      { key: "news-page" },
      { $set: { heroPosterPath: posterPath, heroPosterPublicId: uploaded?.public_id || "" }, $setOnInsert: { key: "news-page" } },
      { new: true, upsert: true, runValidators: true },
    );
    if (previous?.heroPosterPublicId) await removeImage(previous.heroPosterPublicId);
    if (previousPath) removeUpload(previousPath);
    res.redirect("/admin/video_news?posterSaved=1");
  } catch (error) {
    if (file) removeUpload(`/uploads/news/${file.filename}`);
    next(error);
  }
};

exports.deleteHeroPoster = async (_req, res, next) => {
  try {
    const setting = await NewsPageSetting.findOneAndUpdate(
      { key: "news-page" },
      { $set: { heroPosterPath: "", heroPosterPublicId: "" } },
      { new: false },
    );
    if (setting?.heroPosterPublicId) await removeImage(setting.heroPosterPublicId);
    if (setting?.heroPosterPath) removeUpload(setting.heroPosterPath);
    res.redirect("/admin/video_news?posterRemoved=1");
  } catch (error) {
    next(error);
  }
};

exports.addPage = async (req, res, next) => {
  try {
    const item = req.params.id
      ? await VideoNews.findById(req.params.id).lean()
      : null;

    if (req.params.id && !item) {
      return res
        .status(404)
        .render("error", { title: "404", message: "News item not found" });
    }

    res.render("admin/news/editor", {
      title: item ? "Edit News" : "Create News",
      item,
      error: null,
      currentPath: "/admin/video_news",
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const file = req.file;
  let existing;
  let uploaded;

  try {
    existing = req.params.id ? await VideoNews.findById(req.params.id) : null;

    if (req.params.id && !existing) {
      if (file) removeUpload(`/uploads/news/${file.filename}`);
      return res.status(404).send("News item not found");
    }

    const title = String(req.body.title || "").trim();
    const content = String(req.body.content || "").trim();
    const category = req.body.category;
    const source = String(req.body.source || "").trim();
    const summary = String(req.body.summary || "").trim();
    const state = String(req.body.state || "").trim();
    const district = String(req.body.district || "").trim();

    if (!title || !content || !source) {
      throw new Error("Headline, source name and full article are required.");
    }
    if (!["Digital Media", "Print Media"].includes(category)) {
      throw new Error("Choose Digital Media or Print Media.");
    }

    const dateInput = String(req.body.publicationDate || "").trim();
    const publicationDate = dateInput
      ? new Date(`${dateInput}T12:00:00`)
      : null;

    if (dateInput && Number.isNaN(publicationDate.getTime())) {
      throw new Error("Enter a valid publication date.");
    }

    const externalUrl = safeExternalUrl(req.body.externalUrl);
    const hostedThumbnail = safeImageUrl(req.body.thumbnailUrl);
    const publishNow = req.body.action === "publish";
    uploaded = file
      ? await uploadBuffer(file.buffer, "nishad-yatra/news/articles")
      : null;
    const doc = existing || new VideoNews();
    const previousThumbnail = existing?.thumbnailPath;

    const isHighlighted =
      req.body.isHighlighted === "on" ||
      req.body.isHighlighted === "true" ||
      req.body.featured === "on";

    Object.assign(doc, {
      title,
      content,
      summary,
      state,
      district,
      source,
      category,
      publicationDate,
      externalUrl,
      featured: req.body.featured === "on",
      thumbnailPath: hostedThumbnail || uploaded?.secure_url || existing?.thumbnailPath || "",
      thumbnailPublicId: uploaded?.public_id || (hostedThumbnail ? "" : existing?.thumbnailPublicId || ""),
      published: publishNow,
      publishedAt: publishNow ? existing?.publishedAt || new Date() : null,
      author: req.session.admin.name,
      // Clear metadata left by the earlier video-news demo.
      mediaType: "article",
      youtubeUrl: "",
      videoPath: "",
    });

    await doc.save();
    if (existing?.thumbnailPublicId && (uploaded || hostedThumbnail)) {
      await removeImage(existing.thumbnailPublicId);
    }
    if ((file || hostedThumbnail) && previousThumbnail) removeUpload(previousThumbnail);

    res.redirect("/admin/video_news?saved=1");
  } catch (error) {
    if (uploaded?.public_id) await removeImage(uploaded.public_id).catch(() => {});

    const validationMessages = [
      "Headline, source name and full article are required.",
      "Choose Digital Media or Print Media.",
      "Enter a valid publication date.",
      "Enter a valid external news URL.",
      "External news links must use HTTP or HTTPS.",
      "Enter a valid hosted image URL.",
      "Hosted image URLs must use HTTP or HTTPS.",
    ];

    if (
      error.name === "ValidationError" ||
      validationMessages.includes(error.message)
    ) {
      return renderEditor(
        res,
        {
          ...req.body,
          _id: req.params.id,
          thumbnailPath: existing?.thumbnailPath,
        },
        error.message,
        400,
      );
    }

    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const item = await VideoNews.findByIdAndDelete(req.params.id);

    if (item) {
      removeUpload(item.videoPath);
      removeUpload(item.thumbnailPath);
      await removeImage(item.thumbnailPublicId);
    }

    res.redirect("/admin/video_news");
  } catch (error) {
    next(error);
  }
};

exports.togglePublish = async (req, res, next) => {
  try {
    const item = await VideoNews.findById(req.params.id);
    if (!item) return res.redirect("/admin/video_news");

    item.published = !item.published;
    item.publishedAt = item.published
      ? item.publishedAt || new Date()
      : null;

    await item.save();
    res.redirect("/admin/video_news");
  } catch (error) {
    next(error);
  }
};

exports.toggleHighlight = async (req, res, next) => {
  try {
    const item = await VideoNews.findById(req.params.id);
    if (!item) return res.redirect("/admin/video_news");

    const currentStatus = Boolean(item.isHighlighted || item.featured);
    item.isHighlighted = !currentStatus;
    item.featured = !currentStatus;

    await item.save();
    res.redirect("/admin/video_news");
  } catch (error) {
    next(error);
  }
};

exports.frontend = async (req, res, next) => {
  try {
    const filter = { published: true };

    if (["Digital Media", "Print Media"].includes(req.query.category)) {
      filter.category = req.query.category;
    }

    const search = searchFilter(req.query.q);
    if (search) Object.assign(filter, search);

    const state = typeof req.query.state === "string" ? req.query.state.trim().slice(0, 80) : "";
    const district = typeof req.query.district === "string" ? req.query.district.trim().slice(0, 80) : "";
    if (state) filter.state = state;
    if (district) filter.district = district;

    const pageSize = 9;
    const [total, locations, stateCount, newsCount, newsPageSetting] = await Promise.all([
      VideoNews.countDocuments(filter),
      VideoNews.aggregate([
        { $match: { published: true, state: { $nin: [null, ""] }, district: { $nin: [null, ""] } } },
        { $group: { _id: { state: "$state", district: "$district" } } },
        { $sort: { "_id.state": 1, "_id.district": 1 } },
        { $limit: 300 },
      ]),
      VideoNews.distinct("state", { published: true, state: { $nin: [null, ""] } }).then((values) => values.length),
      VideoNews.countDocuments({ published: true }),
      NewsPageSetting.findOne({ key: "news-page" }).lean(),
    ]);
    const pagination = getPagination(req.query.page, total, pageSize);

    const news = await VideoNews.find(filter)
      .sort({
        publicationDate: -1,
        publishedAt: -1,
        createdAt: -1,
      })
      .skip(pagination.skip)
      .limit(pagination.pageSize)
      .lean();

    res.render("news/video_news", {
      title: "न्यूज़ / प्रेस",
      news,
      remaining: news,
      page: pagination.page,
      pageSize: pagination.pageSize,
      total,
      stats: { news: newsCount, districts: locations.length, states: stateCount },
      totalPages: pagination.totalPages,
      locations,
      query: req.query,
      heroPoster: newsPageSetting?.heroPosterPath || "",
    });
  } catch (error) {
    next(error);
  }
};

exports.detail = async (req, res, next) => {
  try {
    const item = await VideoNews.findOne({
      _id: req.params.id,
      published: true,
    }).lean();

    if (!item) {
      return res
        .status(404)
        .render("error", { title: "404", message: "News item not found" });
    }

    res.render("news/article", { title: item.title, item });
  } catch (error) {
    next(error);
  }
};
