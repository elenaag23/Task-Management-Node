const { body, validationResult } = require("express-validator");

const verifyLogin = [
  body("email").notEmpty().withMessage("Email is required!"),
  body("password").notEmpty().withMessage("Password is required!"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Unable to login!",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = verifyLogin;
