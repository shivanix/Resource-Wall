const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.get(`/Music`, (req, res) => {
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

  router.get(`/Food%20and%20Drink`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const title = category.substring(0, 4) + ' ' + category.substring(7, 10) + ' ' + category.substring(13);

    const templateVars = {
      username: user.username,
      id: user.id,
      title
    };

    res.render("search", templateVars);
  })

  router.get(`/Arts%20and%20Crafts`, (req, res) => {
    const user = req.session.user_id;
    const category = req.url.slice(1);
    const title = category.substring(0, 4) + ' ' + category.substring(7, 10) + ' ' + category.substring(13);
    const templateVars = {
      username: user.username,
      id: user.id,
      title
    };

    res.render("search", templateVars);
  })

  router.get(`/Education`, (req, res) => {
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

  router.get(`/Animals`, (req, res) => {
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

  router.get(`/Other`, (req, res) => {
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
