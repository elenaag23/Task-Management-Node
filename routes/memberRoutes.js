// routes/projects.js
const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");
const authenticateToken = require("../middleware/authentication");
const verifyMember = require("../middleware/verifyMember");

// Define routes for CRUD operations
router.post(
  "/members/add",
  authenticateToken,
  verifyMember,
  membersController.add
);
router.get("/members/getMembers/:id", membersController.getMembers);
router.put(
  "/members/edit/:id/:idMember",
  authenticateToken,
  membersController.edit
);
router.delete(
  "/members/delete/:id/:idMember",
  authenticateToken,
  membersController.deleteMember
);

module.exports = router;
