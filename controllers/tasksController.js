// controllers/userController.js
const Task = require("../models/task");

exports.create = async (req, res) => {
  try {
    const userId = req.user.userId;
    const now = new Date();

    const {
      taskTitle,
      taskDescription,
      taskStatus,
      taskDuration,
      taskDeadline,
      taskPriority,
      projectId,
      assignee,
    } = req.body;

    const task = await Task.create({
      taskTitle,
      taskDescription,
      taskStatus,
      taskDuration,
      taskDeadline,
      taskPriority,
      projectId,
      assignee,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findByPk(taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editTask = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const {
    taskTitle,
    taskDescription,
    taskStatus,
    taskDuration,
    taskDeadline,
    taskPriority,
    projectId,
    assignee,
  } = req.body;

  // Find the user by ID
  const task = Task.findByPk(taskId);
  if (!task) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user fields if provided
  if (taskTitle) task.projectName = taskTitle;
  if (taskDescription) task.taskDescription = taskDescription;
  if (taskStatus) task.taskStatus = taskStatus;
  if (taskDuration) task.endDate = taskDuration;
  if (taskDeadline) task.taskDeadline = taskDeadline;
  if (taskPriority) task.taskPriority = taskPriority;
  if (projectId) task.projectId = projectId;
  if (assignee) task.assignee = assignee;

  const [updated] = await Task.update(
    {
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskStatus: task.taskStatus,
      taskDuration: task.taskDuration,
      taskDeadline: task.taskDeadline,
      taskPriority: task.taskPriority,
      projectId: task.projectId,
      assignee: task.assignee,
    },
    { where: { id: taskId } }
  );

  res.status(200).json({ message: "Task updated successfully", task });
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.userId;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.createdBy !== userId) {
      return res
        .status(404)
        .json({ error: "You don't have the rights to delete this project!" });
    }

    await Task.destroy({ where: { id: taskId } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task" });
  }
};
