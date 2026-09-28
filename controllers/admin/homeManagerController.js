const HeroSlide = require("../../models/HeroSlide");
const Initiative = require("../../models/Initiative");
const WhyChoose = require("../../models/WhyChoose");
const SiteNotice = require("../../models/SiteNotice");
const HomeQuickInfo = require("../../models/HomeQuickInfo");
const InitiativeInquiry = require("../../models/InitiativeInquiry");
const SankalpPhoto = require("../../models/SankalpPhoto");

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
    ] = await Promise.all([
      HeroSlide.countDocuments(),
      Initiative.countDocuments(),
      WhyChoose.findOne(),
      SiteNotice.countDocuments(),
      InitiativeInquiry.countDocuments(),
      InitiativeInquiry.countDocuments({ status: "new" }),
      SankalpPhoto.countDocuments(),
    ]);

    const pillarsCount = whyChooseDoc?.pillars?.length || 0;

    res.render("admin/home/index", {
      title: "होम पेज प्रबंधन (Home Manager)",
      admin: req.session.admin,
      stats: {
        heroSlidesCount,
        initiativesCount,
        pillarsCount,
        noticesCount,
        inquiriesCount,
        newInquiriesCount,
        photosCount,
      },
      currentPath: "/admin/home",
    });
  } catch (error) {
    console.error("Home manager error:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "होम पेज प्रबंधन लोड करने में समस्या आई।",
    });
  }
};
