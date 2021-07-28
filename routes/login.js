const express = require('express');
const router  = express.Router();
// const bcrypt = require("bcrypt-pbkdf");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
      })

  router.post("/", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send(`All fields are mandatory. Please <a href="/login"> try again</a>`)
    }

    db.query(`
      SELECT *
      FROM users
      WHERE email = $1
      AND password = $2;
      `, [email, password])
    .then((data) => {
      const user = data.rows[0];
      // console.log("DATA ROW: ", user)
      if (!user) {
        return res.status(403).send(error.message);
      } else {
        req.session.user_id = user;
        res.redirect("/home");
      }
    })
    .catch((error) => {
      res.status(400).send(error.message);
    })
   })

  return router;
};
