const AboutPage = require("../models/AboutPage");

// Render Public About Page
exports.getAboutPage = async (req, res) => {
  try {
    const about = await AboutPage.getOrSeed();

    res.render("about", {
      title: about.meta.pageTitle || "अभियान का संपूर्ण परिचय | निषाद संकल्प अभियान",
      metaDescription: about.meta.pageSubtitle || "एकता, आरक्षण, स्वाभिमान और सामाजिक न्याय का ऐतिहासिक राष्ट्रीय आंदोलन",
      about,
      currentUrl: "/about",
    });
  } catch (error) {
    console.error("Public About Page render error:", error);
    res.render("about", {
      title: "अभियान का संपूर्ण परिचय | निषाद संकल्प अभियान",
      metaDescription: "एकता, आरक्षण, स्वाभिमान और सामाजिक न्याय का ऐतिहासिक राष्ट्रीय आंदोलन",
      about: AboutPage.defaultData,
      currentUrl: "/about",
    });
  }
};
