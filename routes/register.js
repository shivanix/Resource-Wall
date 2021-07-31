const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
      })

  router.post("/", (req, res) => {
    const user = req.body;

    if (!user.email || !user.username || !user.password) {
      return res.status(400).send(`All fields are mandatory. Please <a href="/register"> try again</a>!`)
    }
    if (user.password.length < 8) {
      return res.status(400).send(`Password should be at least 8 characters. Please <a href="/register"> try again</a>!`)
    }

    db.query(`
    SELECT * FROM users
    WHERE email = $1
    OR username = $2
    `, [user.email, user.username])
    .then((result) => {
      const userData = result.rows[0];

      //If user with same email or username was found
      if (result.rows.length > 0) {
        if (userData.email === user.email) {
          return res.status(400).send(`Email already exists. Please <a href="/register"> try again</a>!`);
        } else if (userData.username === user.username) {
          return res.status(400).send(`Username already exists. Please <a href="/register"> try again</a>!`);
        }
      } else {
      //If no user with same email or username was found
        createNewUser(user, req, res);
      }
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
  })

  const createNewUser = (user, req, res)=>{
    db.query(`
        INSERT INTO users(email, username, password)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [user.email, user.username, user.password])
      .then((data) => {
        const newUser = data.rows[0];
        if (!newUser) {
          res.send("Error: ", error.message);
        } else {
          req.session.user_id = newUser;
          res.redirect("/home");
        }
      })
      .catch((error) => {
        res.status(400).send(error.message);
      })
  }
  return router;
};


