const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contactController");

// @desc List all contacts
// @public
router.get("/", contactController.getContacts);

// @desc Create contact
// @public
router.post("/", contactController.createContact);

// @desc Edit contact
// @public
router.put("/:id", contactController.editContact);

// @desc Delete contact
// @public
router.delete("/delete/:id", contactController.deleteContact);

module.exports = router;
