// src/models/Contact.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Update the path to your db configuration

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Contact;
