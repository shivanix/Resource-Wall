const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  // router.get("/", (req, res) => {

  //   const user = req.session.user_id;

  //   const templateVars = {
  //     username: user.username,
  //     id: user.id
  //   };

  //   res.render("search", templateVars);
  //     })

  router.get(`/music`, (req, res) => {
    const user = req.session.user_id;
    console.log('SOMETHING')
    const templateVars = {
      username: user.username,
      id: user.id
    };

    res.render("search", templateVars);
  })

  // router.post("/music", (req, res) => {

  //   const user = req.session.user_id;

  //   const templateVars = {
  //     username: user.username,
  //     id: user.id
  //   };

  //   res.render("search", templateVars);
  //     })


  return router;
}
