const express = require("express");
const router = express.Router();

// @route GET api/contact
// @desc Testing the route
router.get("/", (req, res) => {
  const message = {
    message: "Hello, world!",
  };
  res.json(message);
});

module.exports = router;
