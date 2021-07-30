const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Need to sql inject onclick category
  router.get("/Music", (req, res) => {
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

  router.get("/Food%20and%20Drink", (req, res) => {
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

  router.get("/Arts%20and%20Crafts", (req, res) => {
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

  router.get("/Education", (req, res) => {
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

  router.get("/Animals", (req, res) => {
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

  router.get("/Other", (req, res) => {
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
