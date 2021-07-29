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
    db.query(`SELECT * FROM resources
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

  //router: /resource/id/comments
  router.get("/:id/comments", (req, res) =>{
//extract the id value
//create query t pull comments of that resource/:id from the
// db--join q bet resources users comments

//return the result in json

const id = req.params.id;
console.log("Backend hittttttt");
console.log("idddd", id);
console.log("bodyyyyy", req.body);
// console.log("reqqqqqqq", req);
db.query(`
SELECT *
FROM comments
WHERE resource_id = $1;`, [id])
  .then(results => {
    console.log("REsults returnedddddd");
    const comments = results.rows;
    console.log("comentsssssss", comments);
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

    // console.log("Before insert");
//extract id value
// extract the comment from the form

// insert q into saved comments in db associated with that id

//return username of the user that created the comment
const id = req.body.resource_id;
const userID = req.session.user_id.id;
const comment = req.body.comment;
const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');


db.query(`INSERT INTO comments(resource_id, comment, created_at, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, [ id, comment, timestamp, userID])
    .then((data) => {

      //do a q to select user;

      db.query(`SELECT username FROM users
      WHERE id = $1`,[userID])
      .then((result) =>{
        console.log('@@@@@@',result.rows);
        const newComment = data.rows[0];
        newComment.user_id = userID;
        newComment['username'] = result.rows[0].username;
        console.log("&&&&&&&&&&&& NEW comment", newComment)
        console.log("USER IDDDDDDDDDDDDDDDDDDDDDD:::::::", newComment.user_id);
        res.send(newComment);
      })

      })
    .catch((error) => {
      console.log(error.message);

    })

//

  })
  return router;
};
