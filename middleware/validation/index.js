const validate = require("./validation");
const { validateRegistration, validateLogin } = require("./userValidation");
const { validateEventCreate, validateJoinEvent } = require("./eventVaildation");
const { validateNotificationCreate } = require("./notificationValidation");
const { validateUserId } = require("./familyValidation");
const { validateUploadPhoto } = require("./photoValidaton");
const { validateTika } = require("./tikaValidation");

module.exports = {
  validate,
  validateRegistration,
  validateLogin,
  validateEventCreate,
  validateJoinEvent,
  validateNotificationCreate,
  validateUserId,
  validateUploadPhoto,
  validateTika,
};
