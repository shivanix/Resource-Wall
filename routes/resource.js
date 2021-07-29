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

    db.query(`
    SELECT * FROM resources
    WHERE id = $1;
    `, [id])
      .then((results) => {
        db.query(`
        SELECT * FROM likes
        WHERE user_id = $1 AND resource_id = $2;
        `, [user.id, id])
          .then((likedResults) => {
            const templateVars = {
              username: user.username,
              resource: results.rows[0],
              like: !!likedResults.rows.length
            }
          res.render('resource', templateVars)
          })
      })
      .catch(err => {
        console.log(err.message)
        res.sendStatus(400)
      })
  });

  // /* So that logged in users can edit a created resource */
  // router.post("/:id", (req, res) => {
  //   const id = req.params.id;
  //   const user = req.session.user_id;
  //   const resource = req.session.resource;
  //   const templateVars = {
  //     username: user.username,
  //     id: resource.id
  //   };
  //   res.render("resource", templateVars)
  // });

  router.post("/:id/like", (req, res) => {
    const id = req.params.id;
    const user = req.session.user_id;

    db.query(`
    INSERT INTO likes (user_id, resource_id, is_liked)
    VALUES ($1, $2, true)
    RETURNING *;
    `, [user.id, id])
    .then((data) => {
      res.status(200).send(data.rows[0])
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(400)
    })
  });

  router.post("/:id/unlike", (req, res) => {
    const id = req.params.id;
    const user = req.session.user_id;

    db.query(`
    DELETE FROM likes
    WHERE user_id = $1 AND resource_id = $2;
    `, [user.id, id])
      .then((data) => {
        res.status(200).send(false)
      })
      .catch((err) => {
        console.log(err.message)
        res.sendStatus(400)
      })
  });


  router.post("/:id/rate", (req, res) => {
    const id = req.params.id;
    const user = req.session.user_id;
    const rating = req.body.rating;

    console.log("routeeee", id, user);
    console.log("THIS IS THE RAINGTGGGS STARRR: ", rating)
    console.log(req.body);

    db.query(`
      INSERT INTO ratings(rating, resource_id, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ rating ,id, user.id])
    .then((data) => {
      res.status(200)
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(400)
    })
  });

  router.post("/:id/unrate", (req, res) => {
    const id = req.params.id;
    const user = req.session.user_id;
    const rating = req.body.rating;

    db.query(`
      DELETE rating FROM ratings
      WHERE resource_id = $1 and user_id = $2;
    `, [id, user.id])
    .then((data) => {
      res.status(200)
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(400)
    })
  });

  return router;
};
