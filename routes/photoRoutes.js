


const express = require("express");
const router = express.Router();
const auth = require("../middleware/authVerify");
const photoController = require("../controllers/photoController");
const upload = require("../middleware/upload");

router.post("/", auth, upload.single("photo"), photoController.uploadPhoto);
router.get("/", auth, photoController.getPhotos);
router.get("/shared", auth, photoController.getSharedPhotos);


module.exports = router;