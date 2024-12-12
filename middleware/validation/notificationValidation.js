const { body } = require("express-validator");

const validateNotificationCreate = () => [
  body("recipient")
    .notEmpty()
    .withMessage("Recipient is required")
    .isMongoId()
    .withMessage("Recipient must be a valid MongoDB ObjectId"),

  body("sender")
    .notEmpty()
    .withMessage("Sender is required")
    .isMongoId()
    .withMessage("Sender must be a valid MongoDB ObjectId"),

  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["FAMILY_REQUEST", "EVENT_JOIN"])
    .withMessage("Type must be either 'FAMILY_REQUEST' or 'EVENT_JOIN'"),

  body("eventId")
    .optional()
    .isMongoId()
    .withMessage("Event ID must be a valid MongoDB ObjectId"),

  body("status")
    .optional()
    .isIn(["PENDING", "ACCEPTED", "REJECTED"])
    .withMessage("Status must be either 'PENDING', 'ACCEPTED', or 'REJECTED'"),

  body("read")
    .optional()
    .isBoolean()
    .withMessage("Read must be a boolean value"),
];

module.exports = {
  validateNotificationCreate,
};
