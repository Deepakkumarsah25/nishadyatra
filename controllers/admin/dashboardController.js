exports.dashboard = (req, res) => {
  res.render("admin/dashboard/index", {
    title: "Admin Dashboard",
    admin: req.session.admin,
  });
};