// controllers/userController.js
const Project = require("../models/project");

exports.create = async (req, res) => {
  try {
    const userId = req.user.userId;
    const now = new Date();

    console.log("useriddd: ", userId);
    const { projectName, startDate, projectDescription } = req.body;
    const project = await Project.create({
      projectName: projectName,
      startDate: startDate,
      projectDescription: projectDescription,
      createdBy: userId,
    });

    // const projectAdmin = await ProjectMembers.create({
    //   projectId: project.id,
    //   userId: userId,
    //   role: "Admin",
    // });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const project = await Project.findByPk(projectId);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT route to update user data
exports.editProject = async (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const { projectName, startDate, projectDescription, endDate } = req.body;

  // Find the user by ID
  const project = Project.findByPk(projectId);
  if (!project) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user fields if provided
  if (projectName) project.projectName = projectName;
  if (startDate) project.startDate = startDate;
  if (projectDescription) project.projectDescription = projectDescription;
  if (endDate) project.endDate = endDate;

  const [updated] = await Project.update(
    {
      projectName: project.projectName,
      startDate: project.startDate,
      projectDescription: project.projectDescription,
      endDate: project.endDate,
    },
    { where: { id: projectId } }
  );

  res.status(200).json({ message: "Project updated successfully", project });
};

exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user.userId;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.createdBy !== userId) {
      return res
        .status(404)
        .json({ error: "You don't have the rights to delete this project!" });
    }

    await Project.destroy({ where: { id: projectId } });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the project" });
  }
};
