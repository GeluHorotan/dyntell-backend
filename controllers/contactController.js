const { Contact } = require("../models/Contact");

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    await Contact.sync();
    await Contact.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.json({
      message: `${req.body.name} was added succesfully to the contact list!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();

    if (!contacts || contacts.length === 0)
      throw new Error("No contacts found!");
    console.log(contacts);
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createContact,
  getContacts,
};
