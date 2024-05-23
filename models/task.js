// userModel.js

const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

// Define the User model
const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taskTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDescription: {
      type: DataTypes.STRING,
    },
    taskStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDuration: {
      type: DataTypes.DOUBLE,
    },
    taskDeadline: {
      type: DataTypes.DATE,
    },
    taskPriority: {
      type: DataTypes.STRING,
    },
    projectId: {
      type: DataTypes.INTEGER,
    },
    assignee: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "tasks",
    timestamps: false, // Disable automatic creation of createdAt and updatedAt fields
  }
);

// models/task.js
Task.associate = function (models) {
  Task.belongsTo(models.Project, { foreignKey: "projectId" });
  Task.belongsTo(models.User, { foreignKey: "assignee" });
};

module.exports = Task;
