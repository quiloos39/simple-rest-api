const express = require("express")
const router = express.Router();

// Parameters handler.
router.use("/parameters", require("./parameters"));
router.use((req, res, next) => {
  next();
})
module.exports = router;