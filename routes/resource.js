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
            db.query(`SELECT rating FROM ratings
            WHERE user_id = $1 AND resource_id = $2;
            `, [user.id, id])
            .then((ratingResults) =>{
              const templateVars = {
                username: user.username,
                resource: results.rows[0],
                like: !!likedResults.rows.length,
                rating: ratingResults.rows.length && ratingResults.rows[0].rating
              }
            res.render('resource', templateVars)
            })

          })
      })
      .catch(err => {
        console.log(err.message)
        res.sendStatus(400)
      })
  });

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

  router.get("/:id/ratings", (req, res) =>{
    const id = req.params.id;

    db.query(`
    SELECT resources.*, ROUND(AVG(ratings.rating), 0) AS average_rating
    FROM resources
    JOIN ratings
    ON resources.id = ratings.resource_id
    WHERE ratings.resource_id = $1
    GROUP BY resources.id;`, [id])
      .then(results => {

        const ratings = results.rows;

       return res.json(ratings);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });


 router.post("/:id/rate", (req, res) => {
    const id = req.params.id;
    const user = req.session.user_id;
    const rating = req.body.rating;

    db.query(`SELECT rating
    FROM ratings
    WHERE user_id = $1
    AND resource_id = $2;
    `, [user.id, id])
    .then((data) => {
      if(!data.rows[0]){

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
    }else{

      db.query(`
      UPDATE ratings
      SET rating = $1
      WHERE resource_id = $2 AND user_id = $3;
    `, [rating, id, user.id])
    .then((data) => {
      res.status(200)
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(400)
    })
    }

    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(400)
    });

  });


  return router;
};
