const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.get("/", (req, res) => {

    const user = req.session.user_id;

    const templateVars = {
      username: user.username,
      id: user.id
    };

    res.render("my-resources", templateVars);
      })

  router.post("/", (req, res) => {
    const user = req.session.user_id;

    const templateVars = {
      username: user.username,
      id: user.id
    };

    res.render("my-resources", templateVars);
      })



  return router;
}
