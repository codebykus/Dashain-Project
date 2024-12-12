const { query } = require("express-validator");

const validateMsgStats = () => {
  return [
    query("eventId")
      .notEmpty()
      .withMessage("Event ID is required")
      .isMongoId()
      .withMessage("Event ID must be a valid MongoDB ObjectId"),
    query("senderId")
      .notEmpty()
      .withMessage("Sender ID is required")
      .isMongoId()
      .withMessage("Sender ID must be a valid MongoDB ObjectId"),
  ];
};

const validateEventPerDate = () => {
  return [
    query("date")
      .notEmpty()
      .withMessage("Date is required")
      .withMessage(
        "Date must be in a valid ISO 8601 format (e.g., YYYY-MM-DD)"
      ),
  ];
};

module.exports = {
  validateMsgStats,
  validateEventPerDate,
};
