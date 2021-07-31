const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/animals", (req, res) => {
    db.query(`SELECT * FROM resources
    WHERE category = $1;`, ['Animals'])
    .then(results => {
      const resources = results.rows;
      res.json( resources );
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.get("/arts-and-crafts", (req, res) => {
    db.query(`SELECT * FROM resources
    WHERE category = $1;`, ['Arts and Crafts'])
    .then(results => {
      const resources = results.rows;
      res.json( resources );
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.get("/education", (req, res) => {
    db.query(`SELECT * FROM resources
    WHERE category = $1;`, ['Education'])
    .then(results => {
      const resources = results.rows;
      res.json( resources );
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.get("/food-and-drink", (req, res) => {
    db.query(`SELECT * FROM resources
    WHERE category = $1;`, ['Food and Drink'])
    .then(results => {
      const resources = results.rows;
      res.json( resources );
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.get("/music", (req, res) => {
    db.query(`SELECT * FROM resources
    WHERE category = $1;`, ['Music'])
      .then(results => {
        const resources = results.rows;
        res.json( resources );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/other", (req, res) => {
    db.query(`SELECT * FROM resources
    WHERE category = $1;`, ['Other'])
    .then(results => {
      const resources = results.rows;
      res.json( resources );
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
  };
