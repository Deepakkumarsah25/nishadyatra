const VideoNews = require("../../models/news/VideoNews");

exports.dashboard = async (req, res, next) => {
  try {
    const [totalNews, videoNews, publishedNews] = await Promise.all([
      VideoNews.countDocuments(),
      VideoNews.countDocuments({ mediaType: { $in: ["youtube", "upload"] } }),
      VideoNews.countDocuments({ published: true }),
    ]);
  res.render("admin/dashboard/index", {
    title: "Admin Dashboard",
    admin: req.session.admin,
    totalNews,
    videoNews,
    publishedNews,
  });
  } catch (error) { next(error); }
};
