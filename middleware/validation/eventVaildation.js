const { body} = require("express-validator");

const validateEventCreate= () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .isLength({ max: 100 })
      .withMessage("Title must not exceed 100 characters"),
      body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),
      body("date")
      .notEmpty()
      .withMessage("Date is required")
  
  ];
 
};



module.exports = {
  validateEventCreate

};
