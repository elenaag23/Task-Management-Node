const { body, validationResult } = require("express-validator");

const verifyTask = [
  body("taskTitle").notEmpty().withMessage("Task title is required!"),
  body("taskStatus").notEmpty().withMessage("Task status is required!"),
  body("taskPriority").notEmpty().withMessage("Task priority is required!"),
  body("projectId").notEmpty().withMessage("Project id is required!"),
  body("assignee").notEmpty().withMessage("Assignee id is required!"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Unable to create the task!",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = verifyTask;
