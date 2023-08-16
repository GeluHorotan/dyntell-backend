const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contactController");
const db = require("../../config/db");

// @desc List all contacts
// @public
router.get("/", contactController.getContacts);

// @desc Create contact
// @public
router.post("/", contactController.createContact);

module.exports = router;
