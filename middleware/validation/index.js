const validate = require("./validation");
const { validateRegistration, validateLogin } = require("./userValidation");
const {validateEventCreate}=require("./eventValidation")
module.exports = {
  validate,
  validateRegistration,
  validateLogin,
  validateEventCreate
};