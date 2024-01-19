// src/app.js
const express = require("express");
const { sequelize } = require("./config/dbconfig");
const employeeRoutes = require("./Routes/employeeRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", employeeRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
