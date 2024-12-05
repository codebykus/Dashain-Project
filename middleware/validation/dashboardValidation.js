const { query} = require("express-validator");

const validateMsgStats = () => {
  return [
    query("eventId")
      .withMessage("Event ID must be a valid MongoDB ID"),
    query("senderId")
     
      .withMessage("Sender ID must be a valid MongoDB ID"),
  ];
};


const validateEventPerDate = () => {
  return [
    query("date")
      .withMessage("Date must be a valid "),
  ];
};

module.exports = {
  validateMsgStats,
  validateEventPerDate,
};
