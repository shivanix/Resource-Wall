const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get(`/animals`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const title = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      title
    };

    res.render("search", templateVars);
  })

  router.get(`/arts-and-crafts`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const title = category[0].toUpperCase() + category.substring(1, 4) + ' ' + category.substring(5, 8) + ' ' + category[9].toUpperCase() + category.substring(10);
    const templateVars = {
      username: user.username,
      id: user.id,
      title
    };

    res.render("search", templateVars);
  })

  router.get(`/education`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const title = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      title
    };

    res.render("search", templateVars);
  })

  router.get(`/food-and-drink`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const title = category[0].toUpperCase() + category.substring(1, 4) + ' ' + category.substring(5, 8) + ' ' + category[9].toUpperCase() + category.substring(10);

    const templateVars = {
      username: user.username,
      id: user.id,
      title
    };

    res.render("search", templateVars);
  })

  router.get(`/music`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const title = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      title
    };

    res.render("search", templateVars);
  })

  router.get(`/other`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const title = category[0].toUpperCase() + category.substring(1)
    const templateVars = {
      username: user.username,
      id: user.id,
      title
    };

    res.render("search", templateVars);
  })

  return router;
}
