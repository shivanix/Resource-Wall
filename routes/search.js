const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.get(`/music`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const categoryCapital = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      categoryCapital
    };

    res.render("search", templateVars);
  })

  router.get(`/food-and-drink`, (req, res) => {
    const user = req.session.user_id;

    db.query(`
    SELECT * FROM resources
    JOIN users ON users.id = resources.owner_id;
    `, [])
    .then((results) => {
      const category = results.rows[0].category;
      const templateVars = {
            username: user.username,
            id: user.id,
            category
          };
      res.render("search", templateVars);
    })
      .catch(err => {
        console.log(err.message)
        res.sendStatus(400)
      })
  });


  // router.get(`/food-and-drink`, (req, res) => {
  //   const user = req.session.user_id;
  //   console.log('session:', req.session);
  //   const category = req.url.slice(1);
  //   const categoryCapital = category[0].toUpperCase() + category.substring(1)
  //   const templateVars = {
  //     username: user.username,
  //     id: user.id,
  //     categoryCapital
  //   };

  //   res.render("search", templateVars);
  // })

  router.get(`/arts-and-crafts`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const categoryCapital = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      categoryCapital
    };

    res.render("search", templateVars);
  })

  router.get(`/education`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const categoryCapital = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      categoryCapital
    };

    res.render("search", templateVars);
  })

  router.get(`/animals`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const categoryCapital = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      categoryCapital
    };

    res.render("search", templateVars);
  })

  router.get(`/other`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const categoryCapital = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      categoryCapital
    };

    res.render("search", templateVars);
  })

  return router;
}
