const sequelize = require("./dbConfig");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(userRoutes);
app.use(projectRoutes);

// Start server
const PORT = 7000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
