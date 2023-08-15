const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// @route GET api/contact
// @desc Retrieve contacts from the "contacts" table
router.get("/", async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM contacts";
    const result = await db.query(selectQuery);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Check if "contacts" table exists
    const tableCheckQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'contacts'
      );
    `;

    const tableExistsResult = await db.query(tableCheckQuery);
    const tableExists = tableExistsResult.rows[0].exists;

    if (!tableExists) {
      const createTableQuery = `
        CREATE TABLE contacts (
          id serial PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL
        );
      `;
      await db.query(createTableQuery);
    }

    // Insert the dummy contact
    const insertQuery = "INSERT INTO contacts (name, email) VALUES ($1, $2)";
    const values = ["Dummy Contact", "dummy@example.com"];
    await db.query(insertQuery, values);

    res.json({ message: "Table created with dummy contact" });
  } catch (error) {
    console.error("Error creating table and dummy contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
