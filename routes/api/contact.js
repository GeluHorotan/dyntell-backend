const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contactController");

// @desc List all contacts
// @public
router.get("/", contactController.getContacts);

// @desc Create contact
// @public
router.post("/", contactController.createContact);

// @desc Delete contact
// @public
router.delete("/delete/:id", contactController.deleteContact);

router.delete("/table", contactController.dropContactTable);

module.exports = router;
