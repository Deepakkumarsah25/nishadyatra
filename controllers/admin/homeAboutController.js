const HomeAbout = require("../../models/HomeAbout");

// Render Admin Home About Highlight Editor
exports.getHomeAbout = async (req, res) => {
  try {
    const homeAbout = await HomeAbout.getOrSeed();

    res.render("admin/home/about", {
      title: "Home About Highlight Section",
      admin: req.session.admin,
      homeAbout,
      currentPath: "/admin/home/about",
      message: req.query.msg || null,
      error: req.query.err || null,
    });
  } catch (error) {
    console.error("Fetch Home About error:", error);
    res.status(500).redirect("/admin/home?err=Failed to load About Highlight section data");
  }
};

// Update Home About Highlight Section
exports.postUpdateHomeAbout = async (req, res) => {
  try {
    let doc = await HomeAbout.getOrSeed();

    const {
      isActive,
      badgeText,
      headingPrefix,
      highlightHeading,
      headingSuffix,
      tagline,
      description1,
      description2,
      readMoreText,
      readMoreLink,
      imageBadgeNumber,
      imageBadgeLabel,
      floatingBadgeText,
      quoteText,
      quoteAuthor,
      primaryBtnText,
      primaryBtnLink,
      secondaryBtnText,
      secondaryBtnLink,
      existingImageUrl,
    } = req.body;

    doc.isActive = isActive === "on" || isActive === "true" || isActive === true;
    doc.badgeText = badgeText ? badgeText.trim() : "";
    doc.headingPrefix = headingPrefix ? headingPrefix.trim() : "";
    doc.highlightHeading = highlightHeading ? highlightHeading.trim() : "";
    doc.headingSuffix = headingSuffix ? headingSuffix.trim() : "";
    doc.tagline = tagline ? tagline.trim() : "";
    doc.description1 = description1 ? description1.trim() : "";
    doc.description2 = description2 ? description2.trim() : "";
    doc.readMoreText = readMoreText ? readMoreText.trim() : (primaryBtnText ? primaryBtnText.trim() : "Read More...");
    doc.readMoreLink = readMoreLink ? readMoreLink.trim() : (primaryBtnLink ? primaryBtnLink.trim() : "/about");
    doc.primaryBtnText = doc.readMoreText;
    doc.primaryBtnLink = doc.readMoreLink;
    doc.imageBadgeNumber = imageBadgeNumber ? imageBadgeNumber.trim() : "";
    doc.imageBadgeLabel = imageBadgeLabel ? imageBadgeLabel.trim() : "";
    doc.floatingBadgeText = floatingBadgeText ? floatingBadgeText.trim() : "";
    doc.quoteText = quoteText ? quoteText.trim() : "";
    doc.quoteAuthor = quoteAuthor ? quoteAuthor.trim() : "";
    doc.primaryBtnText = primaryBtnText ? primaryBtnText.trim() : "";
    doc.primaryBtnLink = primaryBtnLink ? primaryBtnLink.trim() : "/about";
    doc.secondaryBtnText = secondaryBtnText ? secondaryBtnText.trim() : "";
    doc.secondaryBtnLink = secondaryBtnLink ? secondaryBtnLink.trim() : "#quickActionSidebar";

    // Handle Multiple Scrolling Images
    let currentImages = [];
    if (req.body["existingImages"]) {
      currentImages = Array.isArray(req.body["existingImages"])
        ? req.body["existingImages"]
        : [req.body["existingImages"]];
      currentImages = currentImages.map((img) => img.trim()).filter(Boolean);
    } else if (doc.images && doc.images.length > 0) {
      currentImages = [...doc.images];
    } else {
      currentImages = [
        "/images/about/nishad-sankalp-rally.jpg",
        "/images/about/nishad-sankalp-hero.jpg",
        "/images/about/nishad-sankalp-chaupal.jpg",
        "/images/about/nishad-sankalp-heritage.jpg",
      ];
    }

    // Process newly uploaded files (req.files array from multer upload.any())
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const uploadedPath = `/uploads/home-about/${file.filename}`;
        currentImages.push(uploadedPath);
      });
    } else if (req.file) {
      currentImages.unshift(`/uploads/home-about/${req.file.filename}`);
    }

    // Remove duplicates and save
    currentImages = [...new Set(currentImages)].filter(Boolean);
    if (currentImages.length === 0) {
      currentImages = [
        "/images/about/nishad-sankalp-rally.jpg",
        "/images/about/nishad-sankalp-hero.jpg",
        "/images/about/nishad-sankalp-chaupal.jpg",
        "/images/about/nishad-sankalp-heritage.jpg",
      ];
    }

    doc.images = currentImages;
    doc.imageUrl = currentImages[0];

    // Process Points (Arrays or individual inputs)
    const titles = Array.isArray(req.body["pointTitle"])
      ? req.body["pointTitle"]
      : req.body["pointTitle"]
      ? [req.body["pointTitle"]]
      : [];
    const descriptions = Array.isArray(req.body["pointDesc"])
      ? req.body["pointDesc"]
      : req.body["pointDesc"]
      ? [req.body["pointDesc"]]
      : [];
    const iconKeys = Array.isArray(req.body["pointIcon"])
      ? req.body["pointIcon"]
      : req.body["pointIcon"]
      ? [req.body["pointIcon"]]
      : [];

    if (titles.length > 0) {
      doc.points = titles
        .map((t, idx) => ({
          title: (t || "").trim(),
          description: (descriptions[idx] || "").trim(),
          iconKey: (iconKeys[idx] || "shield").trim(),
        }))
        .filter((item) => item.title.length > 0);
    }

    // Process Stats
    const statNums = Array.isArray(req.body["statNumber"])
      ? req.body["statNumber"]
      : req.body["statNumber"]
      ? [req.body["statNumber"]]
      : [];
    const statLabels = Array.isArray(req.body["statLabel"])
      ? req.body["statLabel"]
      : req.body["statLabel"]
      ? [req.body["statLabel"]]
      : [];

    if (statNums.length > 0) {
      doc.stats = statNums
        .map((num, idx) => ({
          number: (num || "").trim(),
          label: (statLabels[idx] || "").trim(),
        }))
        .filter((item) => item.number.length > 0 || item.label.length > 0);
    }

    await doc.save();
    res.redirect("/admin/home/about?msg=होम पेज अबाउट हाईलाइट सेक्शन सफलतापूर्वक अपडेट कर दिया गया है।");
  } catch (error) {
    console.error("Update Home About error:", error);
    res.redirect("/admin/home/about?err=" + encodeURIComponent(error.message));
  }
};
