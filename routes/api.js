const express = require("express")
const router = express.Router();

// Parameters handler.
router.use("/parameters", require("./parameters"));

module.exports = router;