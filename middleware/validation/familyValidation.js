const { body } = require("express-validator");

const validateAddFamilyMember = () => [
  body("userId")
    .notEmpty()
    .withMessage("Family member userId is required")
    .isMongoId()
    .withMessage("userId must be a valid MongoDB ObjectId"),
];

module.exports = {
  validateAddFamilyMember,
};
