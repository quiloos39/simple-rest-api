// I will provide .env file in project but normally I wouldn't.

require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/router");

// Enables us to read POST body from client.
app.use(express.urlencoded({extended: true}))

// Router handler.
app.use(routes);

app.listen(8080, console.log("Server is running on port 8080."))