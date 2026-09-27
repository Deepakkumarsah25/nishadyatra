const HeroSlide = require("../../models/HeroSlide");

// List all slides
exports.getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1, createdAt: -1 });
    res.render("admin/home/hero-list", {
      title: "हीरो स्लाइडर प्रबंधन",
      admin: req.session.admin,
      slides,
      currentPath: "/admin/home/hero",
      message: req.query.msg || null,
      error: req.query.err || null,
    });
  } catch (error) {
    console.error("Hero slides fetch error:", error);
    res.status(500).redirect("/admin/home?err=Failed to load hero slides");
  }
};

// Render form to add slide
exports.getCreateHeroSlide = (req, res) => {
  res.render("admin/home/hero-form", {
    title: "नई स्लाइड जोड़ें",
    admin: req.session.admin,
    slide: null,
    currentPath: "/admin/home/hero",
    isEdit: false,
    error: null,
  });
};

// Process new slide
exports.postCreateHeroSlide = async (req, res) => {
  try {
    const {
      tag,
      badgeText,
      headingPrefix,
      highlightText,
      headingSuffix,
      description,
      imageUrl,
      primaryBtnText,
      primaryBtnLink,
      primaryBtnInitiative,
      secondaryBtnText,
      secondaryBtnLink,
      secondaryBtnInitiative,
      order,
      isActive,
    } = req.body;

    await HeroSlide.create({
      tag: tag || "राष्ट्र व समाज हित",
      badgeText: badgeText || "",
      headingPrefix: headingPrefix || "",
      highlightText: highlightText || "",
      headingSuffix: headingSuffix || "",
      description: description || "",
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=85",
      primaryBtnText: primaryBtnText || "अभियान से जुड़ें",
      primaryBtnLink: primaryBtnLink || "#quickActionSidebar",
      primaryBtnInitiative: primaryBtnInitiative || "",
      secondaryBtnText: secondaryBtnText || "हमारे मुख्य कार्य",
      secondaryBtnLink: secondaryBtnLink || "#what-we-do",
      secondaryBtnInitiative: secondaryBtnInitiative || "",
      order: Number(order) || 0,
      isActive: isActive === "on" || isActive === "true" || isActive === true,
    });

    res.redirect("/admin/home/hero?msg=Slide created successfully");
  } catch (error) {
    console.error("Create slide error:", error);
    res.render("admin/home/hero-form", {
      title: "नई स्लाइड जोड़ें",
      admin: req.session.admin,
      slide: req.body,
      currentPath: "/admin/home/hero",
      isEdit: false,
      error: "स्लाइड सहेजने में त्रुटि हुई: " + error.message,
    });
  }
};

// Render form to edit slide
exports.getEditHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    if (!slide) {
      return res.redirect("/admin/home/hero?err=Slide not found");
    }

    res.render("admin/home/hero-form", {
      title: "स्लाइड संपादित करें",
      admin: req.session.admin,
      slide,
      currentPath: "/admin/home/hero",
      isEdit: true,
      error: null,
    });
  } catch (error) {
    console.error("Edit slide fetch error:", error);
    res.redirect("/admin/home/hero?err=Failed to load slide");
  }
};

// Process edit slide
exports.postEditHeroSlide = async (req, res) => {
  try {
    const {
      tag,
      badgeText,
      headingPrefix,
      highlightText,
      headingSuffix,
      description,
      imageUrl,
      primaryBtnText,
      primaryBtnLink,
      primaryBtnInitiative,
      secondaryBtnText,
      secondaryBtnLink,
      secondaryBtnInitiative,
      order,
      isActive,
    } = req.body;

    await HeroSlide.findByIdAndUpdate(req.params.id, {
      tag,
      badgeText,
      headingPrefix,
      highlightText,
      headingSuffix,
      description,
      imageUrl,
      primaryBtnText,
      primaryBtnLink,
      primaryBtnInitiative,
      secondaryBtnText,
      secondaryBtnLink,
      secondaryBtnInitiative,
      order: Number(order) || 0,
      isActive: isActive === "on" || isActive === "true" || isActive === true,
    });

    res.redirect("/admin/home/hero?msg=Slide updated successfully");
  } catch (error) {
    console.error("Update slide error:", error);
    res.render("admin/home/hero-form", {
      title: "स्लाइड संपादित करें",
      admin: req.session.admin,
      slide: { ...req.body, _id: req.params.id },
      currentPath: "/admin/home/hero",
      isEdit: true,
      error: "स्लाइड अपडेट करने में त्रुटि हुई: " + error.message,
    });
  }
};

// Delete slide
exports.deleteHeroSlide = async (req, res) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.redirect("/admin/home/hero?msg=Slide deleted successfully");
  } catch (error) {
    console.error("Delete slide error:", error);
    res.redirect("/admin/home/hero?err=Failed to delete slide");
  }
};

// Toggle active status
exports.toggleHeroSlideStatus = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    if (slide) {
      slide.isActive = !slide.isActive;
      await slide.save();
    }
    res.redirect("/admin/home/hero?msg=Slide status updated");
  } catch (error) {
    console.error("Toggle status error:", error);
    res.redirect("/admin/home/hero?err=Failed to change status");
  }
};
