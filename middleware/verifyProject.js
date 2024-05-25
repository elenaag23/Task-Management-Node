const { body, validationResult } = require("express-validator");

const verifyProject = [
  body("projectName").notEmpty().withMessage("Project name is required!"),
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required!")
    .isDate()
    .withMessage("Start date must be a valid date"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Unable to create the project!",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = verifyProject;
