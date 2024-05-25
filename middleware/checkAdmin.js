// middleware/checkAdmin.js
const ProjectMembers = require("../models/projectMember");

const checkAdmin = async (req, res, next) => {
  console.log("REQ PARAMS: ", req.params);
  const { id } = req.params; // Assuming projectId is passed as a URL parameter
  const userId = req.user.userId; // Extract user ID from authenticated user

  try {
    const member = await ProjectMembers.findOne({
      where: {
        projectid: id,
        userid: userId,
      },
    });

    if (!member || member.role !== "admin") {
      return res.status(403).json({
        message: "You don't have the rights to perform actions on this project",
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

module.exports = checkAdmin;
