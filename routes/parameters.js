// I didn't implemented futures such as parameter type checking or JSDoc because of time constrains.
const express = require("express")
const router = express.Router();
const mysql = require("mysql2/promise");

// Shows all products in database.
// Ex.: GET .../api/products/
router.get("/", async (req, res) => {
  mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  }).then(conn => {
    const result = conn.query("SELECT * FROM test.parameters");
    conn.close()
    return result;
  }).then(([rows, field]) => {
    res.status(200).json(rows);
  }).catch(err => {
    res.status(400).send(err);
  })
});

// Shows specific product in database.
// Ex.: GET .../api/parameters/1
router.get("/:id", async (req, res) => {
  mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  }).then(conn => {
    const result = conn.query("SELECT * FROM test.parameters WHERE productID = ?", [req.params.id]);
    conn.close()
    return result;
  }).then(([rows, field]) => {
    res.status(200).json(rows);
  }).catch(err => {
    res.status(400).send(err);
  })
});

// Creates product in database.
// POST x-www-form-urlencoded .../api/products/create, request body: {productDescription, productName}
router.post("/create/", async (req, res) => {
  mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  }).then(conn => {
    const result = conn.query("INSERT INTO test.parameters(productName, productDescription) VALUES (?, ?)", [req.body.productName, req.body.productDescription]);
    conn.close();
    return result;
  }).then((status) => {
    res.status(200).send("Successful");
  }).catch(err => {
    res.status(403).send(err);
  })
});

// Updates product in database.
// POST x-www-form-urlencoded .../api/products/update request body: {productID, productDescription, productName}
router.post("/update/", async (req, res) => {
  mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  }).then(conn => {
    const result = conn.query("UPDATE test.parameters SET productName = ?, productDescription=? where productID=?", [req.body.productName, req.body.productDescription, req.body.productID]);
    conn.close();
    return result;
  }).then((status) => {
    res.status(200).send("Successful");
  }).catch(err => {
    res.status(400).send(err);
  })
});

router.use((req, res, next) => {
  next();
})


module.exports = router;