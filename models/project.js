// userModel.js

const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

// Define the User model
const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    projectDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      //defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "projects",
    timestamps: false, // Disable automatic creation of createdAt and updatedAt fields
  }
);

// models/project.js
Project.associate = function (models) {
  Project.belongsTo(models.User, { foreignKey: "createdBy" });
  Project.hasMany(models.Task, { foreignKey: "projectId" });
  Project.belongsToMany(models.User, {
    through: models.ProjectMember,
    foreignKey: "projectId",
  });
};

module.exports = Project;
