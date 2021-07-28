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

  router.get("/:id", (req, res) => {
    const id = req.params.id;
<<<<<<< HEAD
    console.log('reqparams', req.params)
    // console.log('resbody', res.body)
    console.log('reqbody', req.body)
    const user = req.session.user_id;
    const resource = req.session.resource;
    // console.log('resource', resource)
=======
    console.log("reqbody", req.bod);

    const user = req.session.user_id;
    const resource = req.session.resource;
    // console.log(".session", resource)

>>>>>>> 6448c2ec12ed4a5be1a5f808c3cc6c400d122f02
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
    const resource = req.session.resource;
    const templateVars = {
      username: user.username,
      id: resource.id
    };
    res.render("resource", templateVars)
  });

  return router;
};
