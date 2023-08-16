const { Contact } = require("../models/Contact");
const { Op } = require("sequelize");

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    await Contact.sync();
    await Contact.create({
      name: name,
      email: email,
      phone: phone,
    });
    res.json({
      message: `${req.body.name} was added succesfully to the contact list!`,
    });
  } catch (error) {
    const errors = error.errors.map((err) => ({
      field: err.path,
      message: err.message,
    }));

    res.status(400).json({ errors });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();

    if (!contacts || contacts.length === 0)
      res.status(404).json({ error: "Contact not found!" });

    res.json(contacts);
  } catch (error) {
    res.status(500).json(error);
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
      return res.status(404).json({ error: "Contact not found." });
    }
    await contact.destroy();
    res.json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
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
  deleteContact,
  dropContactTable,
};
