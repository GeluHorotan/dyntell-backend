const { Contact } = require("../models/Contact");
const { capitalizeWords } = require("../utils/capitalizeWords");

const { Op } = require("sequelize");

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const capitalizedFullName = capitalizeWords(name);

  try {
    await Contact.sync();
    await Contact.create({
      name: capitalizedFullName,
      email: email,
      phone: phone,
    });
    const contacts = await Contact.findAll({ order: [["name", "ASC"]] });

    if (!contacts || contacts.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ message: "Contacts not found!" }] });
    }

    res.json(contacts);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({ errors });
    } else {
      console.error("Error creating the contact:", error);
      res.status(500).json({ errors: [{ message: "Internal server error" }] });
    }
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [["name", "ASC"]] });

    if (!contacts || contacts.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ message: "Contacts not found!" }] });
    }

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ errors: [{ message: "Server error." }] });
  }
};

const editContact = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  const capitalizedFullName = capitalizeWords(name);
  try {
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res
        .status(404)
        .json({ errors: [{ message: "Contact not found!" }] });
    }

    if (name) contact.name = capitalizedFullName;
    if (phone) contact.phone = phone;
    if (email) contact.email = email;

    await contact.save();

    const contacts = await Contact.findAll({ order: [["name", "ASC"]] });

    if (!contacts || contacts.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ message: "Contacts not found!" }] });
    }

    res.json(contacts);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => ({
        contactID: id,
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({ errors });
    } else {
      console.error("Error updating contact:", error);
      res.status(500).json({ errors: [{ message: "Internal server error" }] });
    }
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    if (!contact) {
      return res
        .status(404)
        .json({ errors: [{ message: "Contact not found." }] });
    }
    await contact.destroy();

    const contacts = await Contact.findAll({ order: [["name", "ASC"]] });

    if (!contacts || contacts.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ message: "Contacts not found!" }] });
    }

    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ message: "Server error." }] });
  }
};

const dropContactTable = async (req, res) => {
  try {
    // Drop the "Contact" table
    await Contact.drop();

    res.json({ message: "Contact table dropped successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createContact,
  getContacts,
  editContact,
  deleteContact,
  dropContactTable,
};
