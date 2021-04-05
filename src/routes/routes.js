const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOSTNAME,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.get('/users', (req, res) => {
  pool
    .query('SELECT * FROM users')
    .then(([rows, _fields]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(400).send('Something went wrong.');
    });
});

router.get('/users/:id?', (req, res) => {
  console.log(req.params);
  pool
    .query('SELECT * FROM users WHERE id = ?', [req.params.id])
    .then(([rows, fields]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(400).send('Something went wrong.');
    });
});

router.post('/users', (req, res) => {
  pool
    .query('INSERT INTO users (fullname, password) VALUES (?, ?)', [req.body.fullname, req.body.password])
    .then((([rows, fields]) => {
      res.status(201).send(rows);
    }))
    .catch((err) => {
      console.log(err);
      res.status(400).send('Something went wrong.');
    });
});

router.put('/users', (req, res) => {
  pool
    .query('UPDATE users SET fullname=? WHERE id=?', [req.body.fullname, req.body.id])
    .then((([rows, fields]) => {
      if (rows.affectedRows > 0) {
        res.status(200).send(rows);
      } else {
        throw new Error('Unable to change given row.');
      }
    }))
    .catch((err) => {
      console.log(err);
      res.status(400).send('Something went wrong.');
    });
});

module.exports = router;
