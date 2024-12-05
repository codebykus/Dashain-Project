const { body} = require("express-validator");

const validateTitle = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .isLength({ max: 100 })
      .withMessage("Title must not exceed 100 characters"),
  ];
};

const validateDate = () => {
  return [
    body("date")
      .notEmpty()
      .withMessage("Date is required")
  
  ];
};

const validateDescription = () => {
  return [
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),
  ];
};

const validateCreator = () => {
  return [
    body("creator")
      .notEmpty()
      .withMessage("Creator is required")
    
  ];
};

const validateParticipants = () => {
  return [
    body("participants")
      .isArray()
      .withMessage("Participants must be an array")
  ]
};

module.exports = {
  validateTitle,
  validateDate,
  validateDescription,
  validateCreator,
  validateParticipants,
};
