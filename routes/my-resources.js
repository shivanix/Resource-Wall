const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/resource-queries')



module.exports = (db) => {

  router.get("/", (req, res) => {

    const user = req.session.user_id;
    console.log('user', user)

    const templateVars = {
      username: user.username,
      id: user.id
    };

    res.render("my-resources", templateVars);
      })


  return router;
}
