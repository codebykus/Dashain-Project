const express = require("express");
const router = express.Router();
const auth = require("../middleware/authVerify");
const photoController = require("../controllers/photoController");
const upload = require("../middleware/upload");
const { validateUploadPhoto, validate } = require("./../middleware/validation"); // Import the validation function

// POST route for uploading a photo with validation
router.post(
  "/",
  auth,
  validateUploadPhoto(),
  validate,
  upload.single("photo"),
  photoController.uploadPhoto
);

// GET routes for retrieving photos
router.get("/", auth, photoController.getPhotos);
router.get("/shared", auth, photoController.getSharedPhotos);

module.exports = router;
