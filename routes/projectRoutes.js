// routes/projects.js
const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");
const authenticateToken = require("../middleware/authentication");
const verifyProject = require("../middleware/verifyProject");

// Define routes for CRUD operations
router.post(
  "/projects/create",
  authenticateToken,
  verifyProject,
  projectsController.create
);
router.get("/projects/get", projectsController.getProjects);
router.get("/projects/getProjects/:id", projectsController.getProject);
router.put("/projects/edit/:id", projectsController.editProject);
router.delete(
  "/projects/delete/:id",
  authenticateToken,
  projectsController.deleteProject
);

module.exports = router;
