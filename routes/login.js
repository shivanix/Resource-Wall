const express = require('express');
const router  = express.Router();
// const bcrypt = require("bcrypt-pbkdf");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
      })

  router.post("/", (req, res) => {
    const { email, password } = req.body;
    db.query(`
      SELECT *
      FROM users
      WHERE email = $1;
      `, [email])
    .then((data) => {
      const user = data.rows[0];
      console.log("DATA ROW: ", user)
      if (!user) {
        return res.status(403);
      } else {
        req.session.user_id = user.id;
        res.redirect("/home");
      }
    })
    .catch((error) => {
      res.status(400).send(error.message);
    })
   })

  return router;
};
