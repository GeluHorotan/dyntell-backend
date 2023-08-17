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
        args: [1, 15],
        msg: "Name should have at most 15 characters.",
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
