const SiteNotice = require("../../models/SiteNotice");
const HomeQuickInfo = require("../../models/HomeQuickInfo");
const { defaultQuickInfo } = require("../../scripts/seedHomeData");

// View all notices and sidebar quick info
exports.getNotices = async (req, res) => {
  try {
    const notices = await SiteNotice.find().sort({ order: 1, createdAt: -1 });
    let quickInfo = await HomeQuickInfo.findOne();
    if (!quickInfo) {
      quickInfo = await HomeQuickInfo.create(defaultQuickInfo);
    }

    res.render("admin/home/notices", {
      title: "Latest Notices & Sidebar Helpline Management",
      admin: req.session.admin,
      notices,
      quickInfo,
      currentPath: "/admin/home/notices",
      message: req.query.msg || null,
      error: req.query.err || null,
    });
  } catch (error) {
    console.error("Fetch notices error:", error);
    res.status(500).redirect("/admin/home?err=Failed to load notices");
  }
};

// Create notice
exports.postCreateNotice = async (req, res) => {
  try {
    const { title, dateText, link, order, isActive } = req.body;
    await SiteNotice.create({
      title,
      dateText: dateText || new Date().toLocaleDateString("en-US"),
      link: link || "",
      order: Number(order) || 0,
      isActive: isActive === "on" || isActive === "true" || isActive === true,
    });

    res.redirect("/admin/home/notices?msg=Notice added successfully");
  } catch (error) {
    console.error("Create notice error:", error);
    res.redirect("/admin/home/notices?err=" + encodeURIComponent(error.message));
  }
};

// Edit notice
exports.postEditNotice = async (req, res) => {
  try {
    const { title, dateText, link, order, isActive } = req.body;
    await SiteNotice.findByIdAndUpdate(req.params.id, {
      title,
      dateText,
      link,
      order: Number(order) || 0,
      isActive: isActive === "on" || isActive === "true" || isActive === true,
    });

    res.redirect("/admin/home/notices?msg=Notice updated successfully");
  } catch (error) {
    console.error("Edit notice error:", error);
    res.redirect("/admin/home/notices?err=" + encodeURIComponent(error.message));
  }
};

// Delete notice
exports.deleteNotice = async (req, res) => {
  try {
    await SiteNotice.findByIdAndDelete(req.params.id);
    res.redirect("/admin/home/notices?msg=Notice deleted");
  } catch (error) {
    console.error("Delete notice error:", error);
    res.redirect("/admin/home/notices?err=" + encodeURIComponent(error.message));
  }
};

// Toggle status
exports.toggleNoticeStatus = async (req, res) => {
  try {
    const notice = await SiteNotice.findById(req.params.id);
    if (notice) {
      notice.isActive = !notice.isActive;
      await notice.save();
    }
    res.redirect("/admin/home/notices?msg=Notice status updated");
  } catch (error) {
    console.error("Toggle notice status error:", error);
    res.redirect("/admin/home/notices?err=" + encodeURIComponent(error.message));
  }
};

// Update Quick Info (Sidebar Helpline & Contact Info)
exports.postUpdateQuickInfo = async (req, res) => {
  try {
    const {
      sidebarTitle,
      sidebarSubtitle,
      pledgeBoxTitle,
      pledgeBoxDesc,
      helplineText,
      helplineTel,
      email,
      sidebarFooterText,
    } = req.body;

    let doc = await HomeQuickInfo.findOne();
    if (!doc) {
      doc = new HomeQuickInfo();
    }

    doc.sidebarTitle = sidebarTitle;
    doc.sidebarSubtitle = sidebarSubtitle;
    doc.pledgeBoxTitle = pledgeBoxTitle;
    doc.pledgeBoxDesc = pledgeBoxDesc;
    doc.helplineText = helplineText;
    doc.helplineTel = helplineTel;
    doc.email = email;
    doc.sidebarFooterText = sidebarFooterText;

    await doc.save();
    res.redirect("/admin/home/notices?msg=Quick contact info updated successfully");
  } catch (error) {
    console.error("Update quick info error:", error);
    res.redirect("/admin/home/notices?err=" + encodeURIComponent(error.message));
  }
};
