// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(`SELECT * FROM resources;`)
//       .then(results => {
//         const resources = results.rows;
//         res.json( resources );
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   router.get("/:id", (req, res) => {
//     db.query(`
//     SELECT * FROM resources
//     WHERE id = $1;`, [req.params.id])
//       .then(results => {
//         const resources = results.rows;
//         res.json( resources );
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   return router;
// };

const express = require('express');
const router  = express.Router();

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

  //router: /resource/id/comments
  router.get("/:id/comments", (req, res) =>{
//extract the id value
//create query t pull comments of that resource/:id from the
// db--join q bet resources users comments

//return the result in json

const id = req.params.id;

db.query(`
SELECT comments.*, users.username,
FROM comments
JOIN
WHERE id = $1 AND comment = $2;`, [id, req.body.comment])
  .then(results => {
    const comments = results.rows;
    res.json(comments);
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

    console.log("Before insert");
//extract id value
// extract the comment from the form

// insert q into saved comments in db associated with that id

//return username of the user that created the comment
const id = req.body.resource_id;
const comment = req.body.comment;
const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');


db.query(`INSERT INTO comments(resource_id, comment, created_at)
    VALUES ($1, $2, $3)
    RETURNING *;`, [ id, comment, timestamp])
    .then((data) => {

      //do a q to select user;
      const newComment = data.rows[0];
      console.log("&&&&&&&&&&&& NEW comment", newComment)
      res.send(newComment);
      })
    .catch((error) => {
      console.log(error.message);

    })

//

  })
  return router;
};
