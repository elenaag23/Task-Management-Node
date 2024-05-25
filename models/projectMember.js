// userModel.js

const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Project = require("./project");
const User = require("./user");

// Define the User model
const ProjectMembers = sequelize.define(
  "projectmembers",
  {
    projectid: {
      type: DataTypes.INTEGER,
      references: {
        model: "projects",
        key: "id",
      },
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "projectmembers",
    timestamps: false,
  }
);

ProjectMembers.associate = function (models) {
  ProjectMembers.belongsTo(models.User, { foreignKey: "userid", as: "user" });
  ProjectMembers.belongsTo(models.Project, {
    foreignKey: "projectid",
    as: "project",
  });
};

module.exports = ProjectMembers;
