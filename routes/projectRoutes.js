// routes/projects.js
const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");
const checkAdmin = require("../middleware/checkAdmin");
const authenticateToken = require("../middleware/authentication");
const verifyProject = require("../middleware/verifyProject");
const { check } = require("express-validator");

// Define routes for CRUD operations
router.post(
  "/projects/create",
  authenticateToken,
  verifyProject,
  projectsController.create
);
router.get("/projects/get", projectsController.getProjects);
router.get("/projects/getProjects/:id", projectsController.getProject);
router.put(
  "/projects/edit/:id",
  authenticateToken,
  checkAdmin,
  projectsController.editProject
);
router.delete(
  "/projects/delete/:id",
  authenticateToken,
  checkAdmin,
  projectsController.deleteProject
);

module.exports = router;
