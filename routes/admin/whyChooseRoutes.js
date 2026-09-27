const express = require("express");
const router = express.Router();
const whyChooseController = require("../../controllers/admin/whyChooseController");

// View & update section
router.get("/", whyChooseController.getWhyChoose);
router.post("/update", whyChooseController.postUpdateWhyChoose);

// Trust pillar add & delete
router.post("/pillar/add", whyChooseController.postAddPillar);
router.post("/pillar/delete/:pillarId", whyChooseController.postDeletePillar);

module.exports = router;
