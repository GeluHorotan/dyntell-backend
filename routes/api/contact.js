const express = require("express");
const router = express.Router();
const Contact = require("../../models/Contact");
const db = require("../../config/db");

// @route GET api/contact
// @desc Retrieve contacts from the "contacts" table
router.post("/", async (req, res) => {
  try {
    // Create the "contacts" table if it doesn't exist
    await Contact.sync();

    // Insert the dummy contact
    await Contact.create({
      name: "Dummy Contact",
      email: "dummy@example.com",
    });

    res.json({ message: "Table created with dummy contact" });
  } catch (error) {
    console.error("Error creating table and dummy contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve all contacts from the "contacts" table
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/tables", async (req, res) => {
  try {
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `;
    const result = await db.query(query);

    res.json({ result });
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const deleteTableQuery = `
      DROP TABLE IF EXISTS "Contacts";
    `;
    await db.query(deleteTableQuery);
    res.json({ message: "Contacts table deleted" });
  } catch (error) {
    console.error("Error deleting Contacts table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
