const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contactController");
const db = require("../../config/db");

router.get("/", contactController.getContacts);

module.exports = router;
