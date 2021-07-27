const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
      })

  /* ERRORS:
    If user already exists (username or email) -- ERROR
    If input password does not match requirements (>= 8 characters) -- ERROR
    If email or password is empty -- ERROR
    Else -- none of the errors happened, the details will be stored to users: email, username, password will be stored in the database
  */
  router.post("/", (req, res) => {
    const user = req.body;
    console.log("THIS IS THE USER: ", user);
    let userAlreadyExists = false;
    db.query(`SELECT * FROM users
    WHERE email = $1
    OR username = $2`, [user.email, user.username])
    .then((result) => {
      console.log("Rows result: ",result.rows[0]);
      //If user with same email or username was found
      if(result.rows[0]){
        userAlreadyExists = true;
        console.log("USER ALREADY EXISTS #####################");
        res.status(400).send('User already exists');
        return null;
      }
      //If no user with same email or username was found
      else{
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
        console.log("THIS IS NEWUSER: ". newUser) // getting undefined here

        if (!newUser) {
          res.send("Error: ", error.message);
        } else {
          req.session.user_id = newUser;
          console.log("##############", newUser)
          res.redirect("/home");
        }
      })
      .catch((error) => {
        res.status(400).send(error.message);
      })
  }

  return router;
};


