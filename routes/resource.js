const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user_id;
    const templateVars = {
      username: user.username,
    };

    res.render("resource", templateVars);
      })

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    // console.log('reqparams', req.params)
    const user = req.session.user_id;
    const templateVars = {
      username: user.username,
      id
    };

    res.render("resource", templateVars);
      })

  return router;
};
