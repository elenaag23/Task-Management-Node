// routes/projects.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyUser = require("../middleware/verifyUser");

// Define routes for CRUD operations
router.post("/users/register", verifyUser, usersController.register);
router.post("/login", usersController.login);
router.get("/users/get", usersController.getUsers);
router.get("/users/getUser/:id", usersController.getUser);
router.put("/users/edit/:id", usersController.editUser);
router.delete("/users/delete/:id", usersController.deleteUser);

module.exports = router;
