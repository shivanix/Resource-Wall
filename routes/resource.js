const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // const id = req.params.id;
    const user = req.session.user_id;
    const templateVars = {
      username: user.username,
      // id
    };

    res.render("resource", templateVars);
      })

  return router;
};
