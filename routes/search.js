const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.get(`/music`, (req, res) => {
    const user = req.session.user_id;
    // const category = ;
    const templateVars = {
      username: user.username,
      id: user.id,
      // category
    };

    res.render("search", templateVars);
  })

  router.get(`/food-and-drink`, (req, res) => {
    const user = req.session.user_id;
    // const category = ;
    const templateVars = {
      username: user.username,
      id: user.id,
      // category
    };

    res.render("search", templateVars);
  })

  router.get(`/arts-and-crafts`, (req, res) => {
    const user = req.session.user_id;
    // const category = ;
    const templateVars = {
      username: user.username,
      id: user.id,
      // category
    };

    res.render("search", templateVars);
  })

  router.get(`/education`, (req, res) => {
    const user = req.session.user_id;
    // const category = ;
    const templateVars = {
      username: user.username,
      id: user.id,
      // category
    };

    res.render("search", templateVars);
  })

  router.get(`/animals`, (req, res) => {
    const user = req.session.user_id;
    // const category = ;
    const templateVars = {
      username: user.username,
      id: user.id,
      // category
    };

    res.render("search", templateVars);
  })

  router.get(`/other`, (req, res) => {
    const user = req.session.user_id;
    // const category = ;
    const templateVars = {
      username: user.username,
      id: user.id,
      // category
    };

    res.render("search", templateVars);
  })

  return router;
}
