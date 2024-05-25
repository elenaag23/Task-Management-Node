// routes/projects.js
const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const authenticateToken = require("../middleware/authentication");
const verifyTask = require("../middleware/verifyTask");

// Define routes for CRUD operations
router.post(
  "/tasks/create",
  authenticateToken,
  verifyTask,
  tasksController.create
);
router.get("/tasks/get", tasksController.getTasks);
router.get("/tasks/getTasks/:id", tasksController.getTask);
router.put("/tasks/edit/:id", tasksController.editTask);
router.delete(
  "/tasks/delete/:id",
  authenticateToken,
  tasksController.deleteTask
);

module.exports = router;
