const express = require('express');
const { registerUser, loginUser, getUserDetails,editUserDetails} = require('../controllers/userController');
const router = express.Router();
const authValidation=require("../middleware/authverify")
const upload=require("../middleware/upload")
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/details",authValidation,getUserDetails)
router.patch("/edit",authValidation,upload.single("photo"),editUserDetails)
module.exports = router;
