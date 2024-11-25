const express=require("express");
const photoRoutes=express.Router();
const authValidation=require("./../middleware/authverify");
const upload=require("./../middleware/upload");
const { uploadPhoto}=require("../controllers/photoController");
photoRoutes.post("/",authValidation,upload.single("photo"),uploadPhoto);

module.exports=photoRoutes;