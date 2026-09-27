const express = require("express");
const router = express.Router();
const initiativeController = require("../../controllers/admin/initiativeController");

// List all initiatives
router.get("/", initiativeController.getInitiatives);

// Create form & post
router.get("/new", initiativeController.getCreateInitiative);
router.post("/new", initiativeController.postCreateInitiative);

// Edit form & post
router.get("/edit/:id", initiativeController.getEditInitiative);
router.post("/edit/:id", initiativeController.postEditInitiative);

// Delete & status toggle
router.post("/delete/:id", initiativeController.deleteInitiative);
router.post("/toggle/:id", initiativeController.toggleInitiativeStatus);

module.exports = router;
