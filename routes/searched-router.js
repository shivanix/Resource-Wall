const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Need to sql inject onclick category
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

  return router;
};
