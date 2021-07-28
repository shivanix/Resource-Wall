const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user_id;
    const templateVars = {
      username: user.username,
    };

    res.render("resource", templateVars);
  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log("reqbody", req.bod);

    const user = req.session.user_id;
    const resource = req.session.resource;
    // console.log(".session", resource)

    const templateVars = {
      username: user.username,
      id: resource.id
    };
    res.render("resource", templateVars);
  });


  /* So that logged in users can post a created resource */
  router.post("/:id", (req, res) => {
    const id = req.params.id;
    const user = req.session.user_id;

    res.render("resource")
  });

  return router;
};
