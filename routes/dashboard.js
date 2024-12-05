const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const auth = require("../middleware/authverify");

router.get("/", auth, dashboardController.getDashboardData);
router.get("/statistics", auth, dashboardController.getPhotoStatistics);
router.get("/msgStats", auth, dashboardController.msgStats);
router.get("/eventDate", auth, dashboardController.eventPerDate);

module.exports = router;
