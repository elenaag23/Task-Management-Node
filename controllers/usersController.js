// controllers/userController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log("FOUND USERS: ", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    console.log("FOUND USER: ", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Găsirea utilizatorului după email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
    }

    // Verificarea parolei
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Parola este incorectă" });
    }

    // Generarea tokenului
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Trimiterea tokenului în răspuns
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    console.log("REQ BODY: ", req.body);
    const { firstName, lastName, email, password } = req.body;

    console.log("req body: ", firstName, lastName, email, password);

    // // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // // Create a new user
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    // console.log("USER", user);
    //console.log("jwt: ", process.env.JWT_SECRET);

    // Generate a token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //localStorage.setItem("authToken", token);

    // Send the token in the response
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT route to update user data
exports.editUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { firstName, lastName, email, password } = req.body;

  // Find the user by ID
  const user = User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user fields if provided
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }
  const [updated] = await User.update(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    },
    { where: { id: userId } }
  );

  res.status(200).json({ message: "User updated successfully", user });
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.destroy({ where: { id: userId } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};
