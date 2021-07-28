const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("LOGOUT !!!!!!!!!!!!!!!!!!!!!!!!!")
    req.session = null;
    res.redirect("/");
  })
  return router;
};
