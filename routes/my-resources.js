const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/resource-queries')



module.exports = (db) => {

  router.get("/", (req, res) => {

    const user = req.session.user_id;

    const templateVars = {
      username: user.username
    };

    res.render("my-resources", templateVars);
      })


  return router;
}
