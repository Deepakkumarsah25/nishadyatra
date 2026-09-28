const Initiative = require("../../models/Initiative");

// List all initiatives
exports.getInitiatives = async (req, res) => {
  try {
    const initiatives = await Initiative.find().sort({ order: 1, createdAt: 1 });
    res.render("admin/home/initiative-list", {
      title: "Key Initiatives & What We Do Management",
      admin: req.session.admin,
      initiatives,
      currentPath: "/admin/home/initiatives",
      message: req.query.msg || null,
      error: req.query.err || null,
    });
  } catch (error) {
    console.error("Fetch initiatives error:", error);
    res.status(500).redirect("/admin/home?err=Failed to load initiatives");
  }
};

// Render create form
exports.getCreateInitiative = (req, res) => {
  res.render("admin/home/initiative-form", {
    title: "Add New Initiative",
    admin: req.session.admin,
    initiative: null,
    currentPath: "/admin/home/initiatives",
    isEdit: false,
    error: null,
  });
};

// Process create
exports.postCreateInitiative = async (req, res) => {
  try {
    const {
      key,
      cardTag,
      title,
      description,
      points,
      btnText,
      modalTag,
      modalTitle,
      modalDescription,
      modalHighlights,
      helplineText,
      helplineTel,
      formTitle,
      formSubmitText,
      iconKey,
      order,
      isActive,
    } = req.body;

    // Convert newline separated points into arrays
    const pointsArray = points
      ? points
          .split("\n")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    const highlightsArray = modalHighlights
      ? modalHighlights
          .split("\n")
          .map((h) => h.trim())
          .filter(Boolean)
      : [];

    await Initiative.create({
      key: key.toLowerCase().trim().replace(/\s+/g, "-"),
      cardTag: cardTag || "Initiative",
      title: title || "",
      description: description || "",
      points: pointsArray,
      btnText: btnText || "Support or Join",
      modalTag: modalTag || cardTag || "",
      modalTitle: modalTitle || title || "",
      modalDescription: modalDescription || description || "",
      modalHighlights: highlightsArray,
      helplineText: helplineText || "",
      helplineTel: helplineTel || "",
      formTitle: formTitle || "Registration & Support Form",
      formSubmitText: formSubmitText || "Send Support Request",
      iconKey: iconKey || "scale",
      order: Number(order) || 0,
      isActive: isActive === "on" || isActive === "true" || isActive === true,
    });

    res.redirect("/admin/home/initiatives?msg=Initiative created successfully");
  } catch (error) {
    console.error("Create initiative error:", error);
    res.render("admin/home/initiative-form", {
      title: "Add New Initiative",
      admin: req.session.admin,
      initiative: req.body,
      currentPath: "/admin/home/initiatives",
      isEdit: false,
      error: "Error saving initiative: " + error.message,
    });
  }
};

// Render edit form
exports.getEditInitiative = async (req, res) => {
  try {
    const initiative = await Initiative.findById(req.params.id);
    if (!initiative) {
      return res.redirect("/admin/home/initiatives?err=Initiative not found");
    }

    res.render("admin/home/initiative-form", {
      title: "Edit Initiative",
      admin: req.session.admin,
      initiative,
      currentPath: "/admin/home/initiatives",
      isEdit: true,
      error: null,
    });
  } catch (error) {
    console.error("Edit initiative fetch error:", error);
    res.redirect("/admin/home/initiatives?err=Failed to load initiative");
  }
};

// Process edit
exports.postEditInitiative = async (req, res) => {
  try {
    const {
      key,
      cardTag,
      title,
      description,
      points,
      btnText,
      modalTag,
      modalTitle,
      modalDescription,
      modalHighlights,
      helplineText,
      helplineTel,
      formTitle,
      formSubmitText,
      iconKey,
      order,
      isActive,
    } = req.body;

    const pointsArray = points
      ? (Array.isArray(points) ? points : points.split("\n"))
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    const highlightsArray = modalHighlights
      ? (Array.isArray(modalHighlights) ? modalHighlights : modalHighlights.split("\n"))
          .map((h) => h.trim())
          .filter(Boolean)
      : [];

    await Initiative.findByIdAndUpdate(req.params.id, {
      key: key.toLowerCase().trim().replace(/\s+/g, "-"),
      cardTag,
      title,
      description,
      points: pointsArray,
      btnText,
      modalTag,
      modalTitle,
      modalDescription,
      modalHighlights: highlightsArray,
      helplineText,
      helplineTel,
      formTitle,
      formSubmitText,
      iconKey,
      order: Number(order) || 0,
      isActive: isActive === "on" || isActive === "true" || isActive === true,
    });

    res.redirect("/admin/home/initiatives?msg=Initiative updated successfully");
  } catch (error) {
    console.error("Update initiative error:", error);
    res.render("admin/home/initiative-form", {
      title: "Edit Initiative",
      admin: req.session.admin,
      initiative: { ...req.body, _id: req.params.id },
      currentPath: "/admin/home/initiatives",
      isEdit: true,
      error: "Error updating initiative: " + error.message,
    });
  }
};

// Delete initiative
exports.deleteInitiative = async (req, res) => {
  try {
    await Initiative.findByIdAndDelete(req.params.id);
    res.redirect("/admin/home/initiatives?msg=Initiative deleted successfully");
  } catch (error) {
    console.error("Delete initiative error:", error);
    res.redirect("/admin/home/initiatives?err=Failed to delete initiative");
  }
};

// Toggle status
exports.toggleInitiativeStatus = async (req, res) => {
  try {
    const initiative = await Initiative.findById(req.params.id);
    if (initiative) {
      initiative.isActive = !initiative.isActive;
      await initiative.save();
    }
    res.redirect("/admin/home/initiatives?msg=Status updated");
  } catch (error) {
    console.error("Toggle initiative error:", error);
    res.redirect("/admin/home/initiatives?err=Failed to update status");
  }
};
