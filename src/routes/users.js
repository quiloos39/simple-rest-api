const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  connection
    .query('SELECT * FROM users')
    .then(([rows, fields]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(400).send('Something went wrong.');
    });
});

router.get('/:id?', (req, res) => {
  connection
    .query('SELECT * FROM users WHERE id = ?', [req.params.id])
    .then(([rows, fields]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(400).send('Something went wrong.');
    });
});

router.post('/', (req, res) => {
  connection
    .query('INSERT INTO users (fullname, password) VALUES (?, ?)', [req.body.fullname, req.body.password])
    .then((([rows, fields]) => {
      res.status(201).send(rows);
    }))
    .catch((err) => {
      res.status(400).send('Something went wrong.');
    });
});

router.put('/', (req, res) => {
  connection
    .query('UPDATE users SET fullname=? WHERE id=?', [req.body.fullname, req.body.id])
    .then((([rows, fields]) => {
      if (rows.affectedRows > 0) {
        res.status(200).send(rows);
      } else {
        throw new Error('Unable to change given row.');
      }
    }))
    .catch((err) => {
      res.status(400).send('Something went wrong.');
    });
});

module.exports = router;
