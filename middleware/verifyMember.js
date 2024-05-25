const { body, validationResult } = require("express-validator");

const verifyMember = [
  body("projectId").notEmpty().withMessage("Project id is required!"),
  body("userId").notEmpty().withMessage("Member id is required!"),
  body("role").notEmpty().withMessage("Member role is required!"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Unable to create the project member!",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = verifyMember;
