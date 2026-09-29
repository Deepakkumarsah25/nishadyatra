const HeroSlide = require("../../models/HeroSlide");
const Initiative = require("../../models/Initiative");
const WhyChoose = require("../../models/WhyChoose");
const SiteNotice = require("../../models/SiteNotice");
const HomeQuickInfo = require("../../models/HomeQuickInfo");
const InitiativeInquiry = require("../../models/InitiativeInquiry");
const SankalpPhoto = require("../../models/SankalpPhoto");
const VideoNews = require("../../models/news/VideoNews");

exports.getHomeDashboard = async (req, res) => {
  try {
    const [
      heroSlidesCount,
      initiativesCount,
      whyChooseDoc,
      noticesCount,
      inquiriesCount,
      newInquiriesCount,
      photosCount,
      newsCount,
      newsHighlightCount,
    ] = await Promise.all([
      HeroSlide.countDocuments(),
      Initiative.countDocuments(),
      WhyChoose.findOne(),
      SiteNotice.countDocuments(),
      InitiativeInquiry.countDocuments(),
      InitiativeInquiry.countDocuments({ status: "new" }),
      SankalpPhoto.countDocuments(),
      VideoNews.countDocuments({ published: true }).catch(() => 0),
      VideoNews.countDocuments({
        published: true,
        $or: [{ isHighlighted: true }, { featured: true }],
      }).catch(() => 0),
    ]);

    const pillarsCount = whyChooseDoc?.pillars?.length || 0;

    res.render("admin/home/index", {
      title: "Home Page Management",
      admin: req.session.admin,
      stats: {
        heroSlidesCount,
        initiativesCount,
        pillarsCount,
        noticesCount,
        inquiriesCount,
        newInquiriesCount,
        photosCount,
        newsCount,
        newsHighlightCount,
      },
      currentPath: "/admin/home",
    });
  } catch (error) {
    console.error("Home manager error:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load Home Page Manager.",
    });
  }
};
