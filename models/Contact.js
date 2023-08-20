const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4, // Generate UUID for each new contact
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\s]*$/, // Allow letters and spaces only
      len: {
        args: [3, 20],
        msg: "The name must have between 3-20 characters!",
      },
    },
    unique: {
      msg: "The name already exists.",
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: "The phone number must contain only digits.",
      },
      len: {
        args: [10, 15],
        msg: "The phone number must have between 10-15 digits.",
      },
    },
    unique: {
      msg: "The phone number already exists.",
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        msg: "The email must be a valid email.",
      },
      len: {
        args: [0, 30],
        msg: "The email must have between 3-30 characters!",
      },
    },
    unique: {
      msg: "The email already exists.",
    },
  },
});

module.exports = { Contact };
