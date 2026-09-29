const fs = require("fs");
const path = require("path");
const VideoNews = require("../../models/news/VideoNews");

function youtubeId(value = "") {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("/")[0];
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const match = url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
      return match?.[1] || null;
    }
  } catch (_) {}
  return null;
}

function removeUpload(file) {
  if (!file || !file.startsWith("/uploads/")) return;
  const full = path.join(process.cwd(), file.replace(/^\//, ""));
  fs.unlink(full, () => {});
}

exports.adminList = async (_req, res, next) => {
  try {
    const news = await VideoNews.find().sort({ createdAt: -1 }).lean();
    res.render("admin/news/index", { title: "News Studio", news });
  } catch (error) { next(error); }
};

exports.addPage = async (req, res, next) => {
  try {
    const item = req.params.id ? await VideoNews.findById(req.params.id).lean() : null;
    if (req.params.id && !item) return res.status(404).render("error", { title: "404", message: "News item not found" });
    res.render("admin/news/editor", { title: item ? "Edit News" : "Create News", item, error: null });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  const files = req.files || {};
  try {
    const existing = req.params.id ? await VideoNews.findById(req.params.id) : null;
    if (req.params.id && !existing) return res.status(404).send("News item not found");
    const mediaType = ["youtube", "upload", "article"].includes(req.body.mediaType) ? req.body.mediaType : "article";
    const link = String(req.body.youtubeUrl || "").trim();
    if (!req.body.title?.trim() || !req.body.content?.trim()) throw new Error("Add a headline and story before saving.");
    if (mediaType === "youtube" && !youtubeId(link)) throw new Error("Enter a valid YouTube video link.");
    if (mediaType === "upload" && !files.video?.[0] && !existing?.videoPath) throw new Error("Choose a video to upload.");
    const publishNow = req.body.action === "publish";
    const doc = existing || new VideoNews();
    Object.assign(doc, {
      title: req.body.title.trim(), summary: (req.body.summary || "").trim(), content: req.body.content.trim(),
      category: (req.body.category || "News").trim(), state: (req.body.state || "").trim(), district: (req.body.district || "").trim(),
      mediaType, youtubeUrl: mediaType === "youtube" ? link : "",
      videoPath: files.video?.[0] ? `/uploads/news/${files.video[0].filename}` : (mediaType === "upload" ? existing?.videoPath || "" : ""),
      thumbnailPath: files.thumbnail?.[0] ? `/uploads/news/${files.thumbnail[0].filename}` : existing?.thumbnailPath || "",
      published: publishNow,
      publishedAt: publishNow ? (existing?.publishedAt || new Date()) : null,
      author: req.session.admin.name,
    });
    if (existing) {
      if (files.video?.[0]) removeUpload(existing.videoPath);
      if (files.thumbnail?.[0]) removeUpload(existing.thumbnailPath);
    }
    await doc.save();
    res.redirect("/admin/video_news?saved=1");
  } catch (error) {
    Object.values(files).flat().forEach((file) => removeUpload(`/uploads/news/${file.filename}`));
    if (error.name === "ValidationError" || error.message.startsWith("Add a headline") || error.message.startsWith("Enter a valid") || error.message.startsWith("Choose a video")) {
      return res.status(400).render("admin/news/editor", { title: "Create News", item: { ...req.body, mediaType: req.body.mediaType }, error: error.message });
    }
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const item = await VideoNews.findByIdAndDelete(req.params.id);
    if (item) { removeUpload(item.videoPath); removeUpload(item.thumbnailPath); }
    res.redirect("/admin/video_news");
  } catch (error) { next(error); }
};

exports.togglePublish = async (req, res, next) => {
  try {
    const item = await VideoNews.findById(req.params.id);
    if (!item) return res.redirect("/admin/video_news");
    item.published = !item.published;
    item.publishedAt = item.published ? new Date() : null;
    await item.save();
    res.redirect("/admin/video_news");
  } catch (error) { next(error); }
};

exports.frontend = async (_req, res, next) => {
  try {
    const news = await VideoNews.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean();
    res.render("news/video_news", { title: "News", news });
  } catch (error) { next(error); }
};

exports.youtubeId = youtubeId;
