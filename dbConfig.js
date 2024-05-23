// dbConfig.js

const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configurarea conexiunii la baza de datew
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      // Dezactivarea timestamp-urilor implicite (createdAt, updatedAt)
      timestamps: true,
    },
  }
);

// Funcție pentru a testa conexiunea
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexiunea la db a fost stabilită cu succes.");
  } catch (error) {
    console.error("Nu s-a putut stabili conexiunea:", error);
  }
};

testConnection();

module.exports = sequelize;
