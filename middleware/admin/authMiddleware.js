const { ADMIN_LOGIN_URL } = require("../../config/adminAuth");

const authMiddleware = (req, res, next) => {
  // Session exist nahi karta
  if (!req.session) {
    return res.redirect(ADMIN_LOGIN_URL);
  }

  // Admin login session nahi hai
  if (!req.session.admin) {
    return res.redirect(ADMIN_LOGIN_URL);
  }

  // Admin session valid hai
  next();
};

module.exports = authMiddleware;