const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user_id;
    const templateVars = {
      username: user.username,
    };

    res.render("resource", templateVars);
  });

  /* Each individual resource can be viewed by any logged in user */
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const user = req.session.user_id;

    const templateVars = {
      username: user.username,
      id: id
    };
    res.render("resource", templateVars);
  });


  /* So that logged in users can post a created resource */
  router.post("/:id", (req, res) => {
    const id = req.params.id;
    const user = req.session.user_id;
    const resource = req.session.resource;
    const templateVars = {
      username: user.username,
      id: resource.id
    };
    res.render("resource", templateVars)
  });

  return router;
};
