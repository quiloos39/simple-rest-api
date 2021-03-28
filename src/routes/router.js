const express = require("express")
const router = express.Router();

// API handler
router.use("/api", require("./api"));

// Redirection to api endpoint.
router.get("/", (req,res) => {
  res.redirect("./api/parameters");
})

// Page not found after all end points are checked.
router.get("*", (req, res) => res.status(404).send("Page not found"));

module.exports = router;