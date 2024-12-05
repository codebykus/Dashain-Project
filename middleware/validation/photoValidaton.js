const { body } = require("express-validator");

const validateUserId = () => {
  return [
    body("userId")
      .notEmpty()
      .withMessage("User ID is required")
    
  ];
};

const validateImageUrl = () => {
  return [
    body("imageUrl")
      .notEmpty()
      .withMessage("Image URL is required")
      .isURL()
      .withMessage("Image URL must be a valid URL"),
  ];
};

const validateDescription = () => {
  return [
    body("description")
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),
  ];
};

module.exports = {
  validateUserId,
  validateImageUrl,
  validateDescription,
};
