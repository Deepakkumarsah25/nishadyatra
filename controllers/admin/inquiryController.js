const InitiativeInquiry = require("../../models/InitiativeInquiry");

// List inquiries & pledges
exports.getInquiries = async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const inquiries = await InitiativeInquiry.find(filter).sort({ createdAt: -1 });

    res.render("admin/home/inquiries", {
      title: "प्राप्त संकल्प एवं सहायता अनुरोध (Pledges & Inquiries)",
      admin: req.session.admin,
      inquiries,
      currentFilter: { status, type },
      currentPath: "/admin/home/inquiries",
      message: req.query.msg || null,
      error: req.query.err || null,
    });
  } catch (error) {
    console.error("Fetch inquiries error:", error);
    res.status(500).redirect("/admin/home?err=Failed to load inquiries");
  }
};

// Update status
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await InitiativeInquiry.findByIdAndUpdate(id, { status });
    res.redirect("/admin/home/inquiries?msg=Status updated");
  } catch (error) {
    console.error("Update status error:", error);
    res.redirect("/admin/home/inquiries?err=Failed to update status");
  }
};

// Delete inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    await InitiativeInquiry.findByIdAndDelete(req.params.id);
    res.redirect("/admin/home/inquiries?msg=Record deleted");
  } catch (error) {
    console.error("Delete inquiry error:", error);
    res.redirect("/admin/home/inquiries?err=Failed to delete record");
  }
};
