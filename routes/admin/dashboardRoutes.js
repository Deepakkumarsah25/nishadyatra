const express = require("express");

const router = express.Router();

const {
  dashboard,
} = require("../../controllers/admin/dashboardController");

const authMiddleware = require("../../middleware/admin/authMiddleware");

// ========================================
// Admin Dashboard
// ========================================

router.get(
  "/dashboard",
  authMiddleware,
  dashboard
);

module.exports = router;