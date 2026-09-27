const WhyChoose = require("../../models/WhyChoose");
const { defaultWhyChoose } = require("../../scripts/seedHomeData");

// View and edit Why Choose Us section
exports.getWhyChoose = async (req, res) => {
  try {
    let whyChoose = await WhyChoose.findOne();
    if (!whyChoose) {
      whyChoose = await WhyChoose.create(defaultWhyChoose);
    }

    res.render("admin/home/why-choose", {
      title: "प्रतिबद्धता एवं विश्वास प्रबंधन (Why Choose Us)",
      admin: req.session.admin,
      whyChoose,
      currentPath: "/admin/home/why-choose",
      message: req.query.msg || null,
      error: req.query.err || null,
    });
  } catch (error) {
    console.error("Fetch Why Choose error:", error);
    res.status(500).redirect("/admin/home?err=Failed to load Why Choose data");
  }
};

// Update section headers & quote showcase
exports.postUpdateWhyChoose = async (req, res) => {
  try {
    const {
      sectionTag,
      sectionTitle,
      highlightText,
      sectionSubtitle,
      introHeading,
      introDesc,
      quoteText,
      pledgePoints,
      pledgeBtnText,
      pledgeBtnLink,
    } = req.body;

    const pledgePointsArray = pledgePoints
      ? (Array.isArray(pledgePoints) ? pledgePoints : pledgePoints.split("\n"))
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    let doc = await WhyChoose.findOne();
    if (!doc) {
      doc = new WhyChoose();
    }

    doc.sectionTag = sectionTag;
    doc.sectionTitle = sectionTitle;
    doc.highlightText = highlightText;
    doc.sectionSubtitle = sectionSubtitle;
    doc.introHeading = introHeading;
    doc.introDesc = introDesc;
    doc.quoteText = quoteText;
    doc.pledgePoints = pledgePointsArray;
    doc.pledgeBtnText = pledgeBtnText;
    doc.pledgeBtnLink = pledgeBtnLink;

    await doc.save();
    res.redirect("/admin/home/why-choose?msg=Section details updated successfully");
  } catch (error) {
    console.error("Update Why Choose error:", error);
    res.redirect("/admin/home/why-choose?err=" + encodeURIComponent(error.message));
  }
};

// Add a trust pillar
exports.postAddPillar = async (req, res) => {
  try {
    const { title, description, iconKey, order } = req.body;
    let doc = await WhyChoose.findOne();
    if (!doc) {
      doc = await WhyChoose.create(defaultWhyChoose);
    }

    doc.pillars.push({
      title: title || "नया आधार",
      description: description || "",
      iconKey: iconKey || "shield",
      order: Number(order) || doc.pillars.length + 1,
    });

    await doc.save();
    res.redirect("/admin/home/why-choose?msg=Trust pillar added successfully");
  } catch (error) {
    console.error("Add pillar error:", error);
    res.redirect("/admin/home/why-choose?err=" + encodeURIComponent(error.message));
  }
};

// Delete a trust pillar
exports.postDeletePillar = async (req, res) => {
  try {
    const { pillarId } = req.params;
    let doc = await WhyChoose.findOne();
    if (doc) {
      doc.pillars = doc.pillars.filter((p) => p._id.toString() !== pillarId);
      await doc.save();
    }
    res.redirect("/admin/home/why-choose?msg=Pillar removed");
  } catch (error) {
    console.error("Delete pillar error:", error);
    res.redirect("/admin/home/why-choose?err=" + encodeURIComponent(error.message));
  }
};
