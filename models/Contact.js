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
      isAlpha: {
        msg: "Name should only contain letters.",
      },
    },
    unique: {
      msg: "Name already exists.",
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: "Phone number should only contain digits.",
      },
      len: {
        args: [10, 10], // Ensure the phone number has only 10 digits
        msg: "Phone number should contain exactly 10 digits.",
      },
    },
    unique: {
      msg: "Phone number already exists.",
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        msg: "Please enter a valid email address.",
      },
    },
    unique: {
      msg: "Email already exists.",
    },
  },
});

module.exports = { Contact };
