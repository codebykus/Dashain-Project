const { body } = require("express-validator");

const validateTika = () => {
  return [
    body("senderId")
      .isMongoId()
      .withMessage("Sender ID must be a valid MongoDB ObjectId"),

    body("receiverId")
      .isMongoId()
      .withMessage("Receiver ID must be a valid MongoDB ObjectId"),

    body("tikaMessage")
      .isLength({ min: 5, max: 500 })
      .withMessage("Tika message must be between 5 and 500 characters"),

    body("blessings")
      .isLength({ min: 5, max: 500 })
      .withMessage("Blessings message must be between 5 and 500 characters"),
  ];
};

module.exports = {
  validateTika,
};
