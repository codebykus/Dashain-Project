const express = require("express");
const familyRoutes = express.Router();
const authValidation = require("./../middleware/authverify");
const {
  addFamilyMember,
  getFamilyMember,
} = require("../controllers/familyController");
const {
  validateAddFamilyMember,
} = require("./../middleware/validation/familyValidation");

// POST route to add a family member with proper validation
familyRoutes.post(
  "/",
  authValidation,
  validateAddFamilyMember(), // Use the correct family member validation
  addFamilyMember
);

// GET route to fetch family members
familyRoutes.get("/", authValidation, getFamilyMember);

module.exports = familyRoutes;
