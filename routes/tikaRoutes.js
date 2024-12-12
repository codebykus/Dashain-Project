const express = require("express");
const router = express.Router();
const { addTika, getTika } = require("../controllers/tikaController");
const authMiddleware = require("../middleware/authverify");
const { validateTika } = require("./../middleware/validation/tikaValidation");

// Route to send Tika
router.post(
  "/",
  authMiddleware,
  validateTika(),

  addTika
);

// Get Tika
router.get("/", authMiddleware, getTika);

module.exports = router;
