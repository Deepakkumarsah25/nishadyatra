const express = require("express");

const router = express.Router();

const {
  showLogin,
  login,
  logout,
} = require("../../controllers/admin/authController");

const guestMiddleware = require("../../middleware/admin/guestMiddleware");

const authMiddleware = require("../../middleware/admin/authMiddleware");

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