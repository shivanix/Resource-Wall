const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/urls");
  })
  return router;
};

// STILL NOT FUNCTIONAL
