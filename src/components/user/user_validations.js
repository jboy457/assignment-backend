const { body } = require("express-validator");

module.exports = {
  authicateUserSchema: () => [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .notEmpty()
      .withMessage("email is required"),
    body("password")
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .withMessage("Must contain at least an uppercase, symbol and number")
  ]
};
