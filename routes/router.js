const express = require("express")
const router = express.Router();

// API handler
router.use("/api", require("./api"));

// To simplify i did redirection.
router.get("/", (req,res) => {
  res.redirect("./api/parameters");
})

module.exports = router;