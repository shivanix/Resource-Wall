const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM resources;`)
      .then(results => {
        const resources = results.rows;
        res.json( resources );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/saved", (req, res) => {
    db.query(`SELECT * FROM resources
    WHERE owner_id = $1;`, [req.session.user_id.id])
      .then(results => {
        const resources = results.rows;
        res.json( resources );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/liked", (req, res) => {
    db.query(`SELECT resources.* FROM resources
    JOIN likes ON resources.id = likes.resource_id
    JOIN users ON users.id = likes.user_id
    WHERE users.id = $1 AND is_liked = true;`, [req.session.user_id.id])
      .then(results => {
        const resources = results.rows;
        res.json( resources );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/:id", (req, res) => {
    db.query(`
    SELECT * FROM resources
    WHERE id = $1;`, [req.params.id])
      .then(results => {
        const resources = results.rows;
        res.json( resources );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


router.get("/:id/comments", (req, res) =>{
const id = req.params.id;


db.query(`
SELECT comments.*,users.username
FROM comments
JOIN users
ON comments.user_id = users.id
WHERE resource_id = $1
ORDER BY comments.created_at ASC;`, [id])
  .then(results => {

    const comments = results.rows;

   return res.json(comments);
  })
  .catch(err => {
    res
      .status(500)
      .json({
        error: err.message
      });
  });
  });


  router.post("/comments", (req, res) => {
  const id = req.body.resource_id;
  const userID = req.session.user_id.id;
  const comment = req.body.comment;

  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');


  db.query(`INSERT INTO comments(resource_id, comment, created_at, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`, [ id, comment, timestamp, userID])
      .then((data) => {

        db.query(`SELECT username FROM users
        WHERE id = $1`,[userID])
        .then((result) =>{
          const newComment = data.rows[0];
          newComment.user_id = userID;
          newComment['username'] = result.rows[0].username;
          newComment.created_at = timestamp;

          res.send(newComment);
        })

        })
      .catch((error) => {
        console.log(error.message);

      });
    });

  return router;
};
