const express = require("express");
const familyRoutes = express.Router();
const authValidation = require("./../middleware/authverify.js");
const {
  addFamilyMember,
  getFamilyMember,
} = require("../controllers/familyController");

familyRoutes.post("/", authValidation, addFamilyMember);
familyRoutes.get("/", authValidation, getFamilyMember);

module.exports = familyRoutes;