const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/')

// GET /my-resources
router.get('/', (req, res) => {
  resourceQueries.getResources()
    .then((resources) => {
      res.json(resources);
    });
})

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("my-resources");
      })

  return router;
};
