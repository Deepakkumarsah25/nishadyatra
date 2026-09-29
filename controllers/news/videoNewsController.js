const fs = require("fs");
const path = require("path");
const VideoNews = require("../../models/news/VideoNews");
const NewsPageSetting = require("../../models/news/NewsPageSetting");

function removeUpload(file) {
  if (!file || !file.startsWith("/uploads/news/")) return;
  fs.unlink(path.join(process.cwd(), file.slice(1)), () => {});
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
  if (!query?.trim()) return null;

  const search = { $regex: escapeRegex(query.trim()), $options: "i" };
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

    const [news, newsPageSetting] = await Promise.all([
      VideoNews.find(filter).sort({ updatedAt: -1 }).lean(),
      NewsPageSetting.findOne({ key: "news-page" }).lean(),
    ]);
    res.render("admin/news/index", {
      title: "News & Press",
      news,
      filters: req.query,
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
  if (!file) return res.redirect("/admin/video_news?posterError=Choose%20an%20image%20to%20upload.");

  try {
    const posterPath = `/uploads/news/${file.filename}`;
    const previous = await NewsPageSetting.findOne({ key: "news-page" });
    const previousPath = previous?.heroPosterPath;
    await NewsPageSetting.findOneAndUpdate(
      { key: "news-page" },
      { $set: { heroPosterPath: posterPath }, $setOnInsert: { key: "news-page" } },
      { new: true, upsert: true, runValidators: true },
    );
    if (previousPath) removeUpload(previousPath);
    res.redirect("/admin/video_news?posterSaved=1");
  } catch (error) {
    removeUpload(`/uploads/news/${file.filename}`);
    next(error);
  }
};

exports.deleteHeroPoster = async (_req, res, next) => {
  try {
    const setting = await NewsPageSetting.findOneAndUpdate(
      { key: "news-page" },
      { $set: { heroPosterPath: "" } },
      { new: false },
    );
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
    const publishNow = req.body.action === "publish";
    const doc = existing || new VideoNews();
    const previousThumbnail = existing?.thumbnailPath;

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
      thumbnailPath: file
        ? `/uploads/news/${file.filename}`
        : existing?.thumbnailPath || "",
      published: publishNow,
      publishedAt: publishNow ? existing?.publishedAt || new Date() : null,
      author: req.session.admin.name,
      // Clear metadata left by the earlier video-news demo.
      mediaType: "article",
      youtubeUrl: "",
      videoPath: "",
    });

    await doc.save();
    if (file && previousThumbnail) removeUpload(previousThumbnail);

    res.redirect("/admin/video_news?saved=1");
  } catch (error) {
    if (file) removeUpload(`/uploads/news/${file.filename}`);

    const validationMessages = [
      "Headline, source name and full article are required.",
      "Choose Digital Media or Print Media.",
      "Enter a valid publication date.",
      "Enter a valid external news URL.",
      "External news links must use HTTP or HTTPS.",
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

exports.frontend = async (req, res, next) => {
  try {
    const filter = { published: true };

    if (["Digital Media", "Print Media"].includes(req.query.category)) {
      filter.category = req.query.category;
    }

    const search = searchFilter(req.query.q);
    if (search) Object.assign(filter, search);

    const state = String(req.query.state || "").trim();
    const district = String(req.query.district || "").trim();
    if (state) filter.state = state;
    if (district) filter.district = district;

    const pageSize = 9;
    const requestedPage = Number.parseInt(req.query.page, 10) || 1;
    const page = Math.max(1, requestedPage);
    const featuredFilter = { published: true, featured: true };
    const [total, locations, featured, videoCount, stateCount, newsCount, newsPageSetting] = await Promise.all([
      VideoNews.countDocuments(filter),
      VideoNews.aggregate([
        { $match: { published: true, state: { $nin: [null, ""] }, district: { $nin: [null, ""] } } },
        { $group: { _id: { state: "$state", district: "$district" } } },
        { $sort: { "_id.state": 1, "_id.district": 1 } },
      ]),
      VideoNews.find(featuredFilter)
        .sort({ publicationDate: -1, publishedAt: -1, createdAt: -1 })
        .limit(5)
        .lean(),
      VideoNews.countDocuments({ published: true, mediaType: { $in: ["youtube", "upload"] } }),
      VideoNews.distinct("state", { published: true, state: { $nin: [null, ""] } }).then((values) => values.length),
      VideoNews.countDocuments({ published: true }),
      NewsPageSetting.findOne({ key: "news-page" }).lean(),
    ]);

    const news = await VideoNews.find(filter)
      .sort({
        publicationDate: -1,
        publishedAt: -1,
        createdAt: -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    res.render("news/video_news", {
      title: "न्यूज़ / प्रेस",
      news,
      featured,
      remaining: news,
      page,
      pageSize,
      total,
      stats: { news: newsCount, videos: videoCount, districts: locations.length, states: stateCount },
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
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
