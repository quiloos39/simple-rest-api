require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(8080);
