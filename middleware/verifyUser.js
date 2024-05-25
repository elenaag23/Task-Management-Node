const { body, validationResult } = require("express-validator");

const verifyUser = [
  body("email").notEmpty().withMessage("Email is required!"),
  body("firstName").notEmpty().withMessage("First name is required!"),
  body("lastName").notEmpty().withMessage("Last name is required!"),
  body("password").notEmpty().withMessage("Password is required!"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Unable to create the user!",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = verifyUser;
