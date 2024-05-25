// middleware/checkAdmin.js
const ProjectMembers = require("../models/projectMember");
const Task = require("../models/task");

const checkAssignee = async (req, res, next) => {
  console.log("REQ PARAMS: ", req.params);
  const { id } = req.params;
  const userId = req.user.userId; // Extract user ID from authenticated user

  try {
    const task = await Task.findByPk(id);
    const member = await ProjectMembers.findOne({
      where: {
        projectid: task.dataValues.projectId,
        userid: userId,
      },
    });

    console.log("task: ", task);
    console.log("member: ", member);
    console.log("user id: ", userId);

    if (
      (!member || member.role !== "admin") &&
      task.dataValues.assignee != userId
    ) {
      return res.status(403).json({
        message: "You don't have the rights to perform actions on this task",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Check admin error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking admin rights" });
  }
};

module.exports = checkAssignee;
