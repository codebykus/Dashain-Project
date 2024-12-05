const { body } = require("express-validator");

const validateRecipient = () => {
  return [
    body("recipient")
      .notEmpty()
      .withMessage("Recipient is required")
  ];
};

const validateSender = () => {
  return [
    body("sender")
      .notEmpty()
      .withMessage("Sender is required")
    
  ];
};

const validateType = () => {
  return [
    body("type")
      .notEmpty()
      .withMessage("Type is required")
      .withMessage("Type must be either 'FAMILY_REQUEST' or 'EVENT_JOIN'"),
  ];
};

const validateEventId = () => {
  return [
    body("eventId")
      .withMessage("Event ID must be a valid "),
  ];
};

const validateStatus = () => {
  return [
    body("status")
      .withMessage("Status must be either 'PENDING', 'ACCEPTED', or 'REJECTED'"),
  ];
};

const validateRead = () => {
  return [
    body("read")
      .withMessage("Read must be a boolean value"),
  ];
};

module.exports = {
  validateRecipient,
  validateSender,
  validateType,
  validateEventId,
  validateStatus,
  validateRead,
};
