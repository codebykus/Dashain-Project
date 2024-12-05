const { body } = require("express-validator");

const validateContent = () => {
  return [
    body("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ max: 1000 })
      .withMessage("Content cannot exceed 1000 characters"),
  ];
};

const validateSender = () => {
  return [
    body("sender")
      .notEmpty()
      .withMessage("Sender is required")
     
  ];
};

const validateEventId = () => {
  return [
    body("eventId")
      .notEmpty()
      .withMessage("Event ID is required")
    
  ];
};

module.exports = {
  validateContent,
  validateSender,
  validateEventId,
};
