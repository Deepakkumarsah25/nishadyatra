const HeroSlide = require("../../models/HeroSlide");
const { defaultHeroSlides } = require("../../scripts/seedHomeData");
const { getPagination } = require("../../utils/pagination");

// List all slides
exports.getHeroSlides = async (req, res) => {
  try {
    const [total, active, hidden] = await Promise.all([
      HeroSlide.countDocuments(),
      HeroSlide.countDocuments({ isActive: true }),
      HeroSlide.countDocuments({ isActive: false }),
    ]);
    const pagination = getPagination(req.query.page, total, 50);
    const slides = await HeroSlide.find()
      .sort({ order: 1, createdAt: 1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize);
    res.render("admin/home/hero-list", {
      title: "Hero Slider Management",
      admin: req.session.admin,
      slides: slides || [],
      pagination,
      paginationPath: "/admin/home/hero",
      paginationQuery: {},
      stats: { total, active, hidden },
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
    title: "Add New Slide",
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

    let finalImageUrl = "";
    if (req.file) {
      finalImageUrl = "/uploads/hero/" + req.file.filename;
    } else if (imageUrl && imageUrl.trim()) {
      finalImageUrl = imageUrl.trim();
    }

    if (!finalImageUrl) {
      finalImageUrl = "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=85";
    }

    await HeroSlide.create({
      tag: (tag && tag.trim()) || "National & Social Service",
      badgeText: (badgeText && badgeText.trim()) || "",
      headingPrefix: (headingPrefix && headingPrefix.trim()) || "",
      highlightText: (highlightText && highlightText.trim()) || "",
      headingSuffix: (headingSuffix && headingSuffix.trim()) || "",
      description: (description && description.trim()) || "",
      imageUrl: finalImageUrl,
      primaryBtnText: (primaryBtnText && primaryBtnText.trim()) || "Join Campaign",
      primaryBtnLink: (primaryBtnLink && primaryBtnLink.trim()) || "#quickActionSidebar",
      primaryBtnInitiative: (primaryBtnInitiative && primaryBtnInitiative.trim()) || "",
      secondaryBtnText: (secondaryBtnText && secondaryBtnText.trim()) || "Our Key Initiatives",
      secondaryBtnLink: (secondaryBtnLink && secondaryBtnLink.trim()) || "#what-we-do",
      secondaryBtnInitiative: (secondaryBtnInitiative && secondaryBtnInitiative.trim()) || "",
      order: Number(order) || 0,
      isActive: isActive === "on" || isActive === "true" || isActive === true,
    });

    res.redirect("/admin/home/hero?msg=Slide created successfully");
  } catch (error) {
    console.error("Create slide error:", error);
    res.render("admin/home/hero-form", {
      title: "Add New Slide",
      admin: req.session.admin,
      slide: req.body,
      currentPath: "/admin/home/hero",
      isEdit: false,
      error: "Error saving slide: " + error.message,
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
      title: "Edit Slide",
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
    const existingSlide = await HeroSlide.findById(req.params.id);
    if (!existingSlide) {
      return res.redirect("/admin/home/hero?err=Slide not found");
    }

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

    let finalImageUrl = existingSlide.imageUrl;
    if (req.file) {
      finalImageUrl = "/uploads/hero/" + req.file.filename;
    } else if (imageUrl && imageUrl.trim()) {
      finalImageUrl = imageUrl.trim();
    }

    existingSlide.tag = (tag && tag.trim()) || existingSlide.tag;
    existingSlide.badgeText = typeof badgeText !== "undefined" ? badgeText.trim() : existingSlide.badgeText;
    existingSlide.headingPrefix = typeof headingPrefix !== "undefined" ? headingPrefix.trim() : existingSlide.headingPrefix;
    existingSlide.highlightText = typeof highlightText !== "undefined" ? highlightText.trim() : existingSlide.highlightText;
    existingSlide.headingSuffix = typeof headingSuffix !== "undefined" ? headingSuffix.trim() : existingSlide.headingSuffix;
    existingSlide.description = typeof description !== "undefined" ? description.trim() : existingSlide.description;
    existingSlide.imageUrl = finalImageUrl;
    existingSlide.primaryBtnText = (primaryBtnText && primaryBtnText.trim()) || "";
    existingSlide.primaryBtnLink = (primaryBtnLink && primaryBtnLink.trim()) || "#quickActionSidebar";
    existingSlide.primaryBtnInitiative = typeof primaryBtnInitiative !== "undefined" ? primaryBtnInitiative.trim() : "";
    existingSlide.secondaryBtnText = (secondaryBtnText && secondaryBtnText.trim()) || "";
    existingSlide.secondaryBtnLink = (secondaryBtnLink && secondaryBtnLink.trim()) || "#what-we-do";
    existingSlide.secondaryBtnInitiative = typeof secondaryBtnInitiative !== "undefined" ? secondaryBtnInitiative.trim() : "";
    existingSlide.order = Number(order) || 0;
    existingSlide.isActive = isActive === "on" || isActive === "true" || isActive === true;

    await existingSlide.save();

    res.redirect("/admin/home/hero?msg=Slide updated successfully");
  } catch (error) {
    console.error("Update slide error:", error);
    res.render("admin/home/hero-form", {
      title: "Edit Slide",
      admin: req.session.admin,
      slide: { ...req.body, _id: req.params.id },
      currentPath: "/admin/home/hero",
      isEdit: true,
      error: "Error updating slide: " + error.message,
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

// Seed default slides if list is empty
exports.restoreDefaultSlides = async (req, res) => {
  try {
    const count = await HeroSlide.countDocuments();
    if (count === 0) {
      await HeroSlide.insertMany(defaultHeroSlides);
      return res.redirect("/admin/home/hero?msg=Default hero slides restored successfully");
    }
    res.redirect("/admin/home/hero?msg=Hero slides already exist");
  } catch (error) {
    console.error("Restore slides error:", error);
    res.redirect("/admin/home/hero?err=Failed to restore default slides");
  }
};
