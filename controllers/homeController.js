const HeroSlide = require("../models/HeroSlide");
const Initiative = require("../models/Initiative");
const WhyChoose = require("../models/WhyChoose");
const SiteNotice = require("../models/SiteNotice");
const HomeQuickInfo = require("../models/HomeQuickInfo");
const InitiativeInquiry = require("../models/InitiativeInquiry");
const {
  defaultHeroSlides,
  defaultInitiatives,
  defaultWhyChoose,
  defaultNotices,
  defaultQuickInfo,
} = require("../scripts/seedHomeData");

// Public Home Page
exports.getHomePage = async (req, res) => {
  try {
    const [heroSlides, initiatives, whyChooseDoc, notices, quickInfoDoc] =
      await Promise.all([
        HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: 1 }),
        Initiative.find({ isActive: true }).sort({ order: 1, createdAt: 1 }),
        WhyChoose.findOne(),
        SiteNotice.find({ isActive: true }).sort({ order: 1, createdAt: 1 }),
        HomeQuickInfo.findOne(),
      ]);

    // Fallbacks if database is completely empty or just initialized
    const finalHeroSlides =
      heroSlides && heroSlides.length > 0 ? heroSlides : defaultHeroSlides;
    const finalInitiatives =
      initiatives && initiatives.length > 0 ? initiatives : defaultInitiatives;
    const finalWhyChoose = whyChooseDoc || defaultWhyChoose;
    const finalNotices =
      notices && notices.length > 0 ? notices : defaultNotices;
    const finalQuickInfo = quickInfoDoc || defaultQuickInfo;

    // Convert initiatives to client-side modal dictionary
    const initiativesModalMap = {};
    finalInitiatives.forEach((item) => {
      initiativesModalMap[item.key] = {
        tag: item.modalTag || item.cardTag,
        title: item.modalTitle || item.title,
        description: item.modalDescription || item.description,
        highlights:
          item.modalHighlights && item.modalHighlights.length > 0
            ? item.modalHighlights
            : item.points || [],
        helplineText: item.helplineText || finalQuickInfo.helplineText,
        helplineTel: item.helplineTel || finalQuickInfo.helplineTel,
        formTitle: item.formTitle || "पंजीकरण एवं सहायता फॉर्म",
        formSubmitText: item.formSubmitText || "सहयोग अनुरोध भेजें",
      };
    });

    res.render("index", {
      title: "निषाद संकल्प अभियान",
      heroSlides: finalHeroSlides,
      initiatives: finalInitiatives,
      initiativesModalMap,
      whyChoose: finalWhyChoose,
      notices: finalNotices,
      quickInfo: finalQuickInfo,
    });
  } catch (error) {
    console.error("Home page render error:", error);
    // Safe render with defaults so the user's site never crashes
    res.render("index", {
      title: "निषाद संकल्प अभियान",
      heroSlides: defaultHeroSlides,
      initiatives: defaultInitiatives,
      initiativesModalMap: {},
      whyChoose: defaultWhyChoose,
      notices: defaultNotices,
      quickInfo: defaultQuickInfo,
    });
  }
};

// Handle Sidebar Pledge Submission
exports.submitPledge = async (req, res) => {
  try {
    const { name, phone, district } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and Phone required" });
    }

    const inquiry = await InitiativeInquiry.create({
      type: "pledge",
      category: "ऑनलाइन संकल्प",
      name: name.trim(),
      phone: phone.trim(),
      district: district ? district.trim() : "",
      message: "वेबसाइट साइडबार से ऑनलाइन संकल्प दर्ज किया गया।",
      status: "new",
    });

    res.json({
      success: true,
      message: "आपका संकल्प सफलतापूर्वक दर्ज कर लिया गया है।",
      id: inquiry._id,
    });
  } catch (error) {
    console.error("Pledge submission error:", error);
    res.status(500).json({ success: false, message: "त्रुटि हुई, पुनः प्रयास करें।" });
  }
};

// Handle Initiative Modal Form Submission
exports.submitInitiativeInquiry = async (req, res) => {
  try {
    const { name, phone, district, category, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and Phone required" });
    }

    const inquiry = await InitiativeInquiry.create({
      type: "initiative",
      category: category ? category.trim() : "पहल सहायता",
      name: name.trim(),
      phone: phone.trim(),
      district: district ? district.trim() : "",
      message: message ? message.trim() : "",
      status: "new",
    });

    res.json({
      success: true,
      message: "आपका अनुरोध सफलतापूर्वक दर्ज कर लिया गया है।",
      id: inquiry._id,
    });
  } catch (error) {
    console.error("Initiative submission error:", error);
    res.status(500).json({ success: false, message: "त्रुटि हुई, पुनः प्रयास करें।" });
  }
};
