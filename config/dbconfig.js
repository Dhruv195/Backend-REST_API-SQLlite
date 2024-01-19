const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.sqlite3",
});

const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z]+$/i,
    },
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
    },
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
    },
  },
});

module.exports = { sequelize, Employee };
