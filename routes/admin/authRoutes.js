const express = require("express");

const router = express.Router();

const {
  showLogin,
  login,
  logout,
} = require("../../controllers/admin/authController");

const guestMiddleware = require("../../middleware/admin/guestMiddleware");

const authMiddleware = require("../../middleware/admin/authMiddleware");
const rateLimit = require("../../middleware/rateLimit");
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please try again later.",
});

// ========================================
// Admin Login Page
// ========================================

router.get(
  "/login",
  guestMiddleware,
  showLogin
);

// ========================================
// Admin Login Submit
// ========================================

router.post(
  "/login",
  guestMiddleware,
  loginRateLimit,
  login
);

// ========================================
// Admin Logout
// ========================================

router.post(
  "/logout",
  authMiddleware,
  logout
);

// Optional GET logout support
router.get(
  "/logout",
  authMiddleware,
  logout
);

module.exports = router;
