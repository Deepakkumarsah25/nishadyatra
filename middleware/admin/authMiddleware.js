const authMiddleware = (req, res, next) => {
  // Session exist nahi karta
  if (!req.session) {
    return res.redirect("/admin/login");
  }

  // Admin login session nahi hai
  if (!req.session.admin) {
    return res.redirect("/admin/login");
  }

  // Admin session valid hai
  next();
};

module.exports = authMiddleware;