// routes/projects.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Define routes for CRUD operations
router.post("/users/register", usersController.register);
router.post("/login", usersController.login);
router.get("/users/get", usersController.getUsers);
router.get("/users/getUser/:id", usersController.getUser);
router.put("/users/edit/:id", usersController.editUser);
router.delete("/users/delete/:id", usersController.deleteUser);

module.exports = router;
