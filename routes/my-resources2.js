const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/resource-queries')



module.exports = (db) => {

  // GET /my-resources
// router.get('/', (req, res) => {
//   //   resourceQueries.getResources()
//   //     .then((resources) => {
//   //       res.json(resources);
//   //     });
//   // console.log('res', res)
//   // console.log('req', req)
//   const templateVars = { title: 'Healthy Breakfast Options' }
//     res.render("my-resources", templateVars);
//   })

  // GET /my-resources/:id
  // router.get('/:id', (req, res) => {
  //   resourceQueries.getResourcesById(req.params.id)
  //     .then((resources) => {
  //       res.json(resources);
  //     });
  // });
  router.get("/", (req, res) => {

    const user = req.session.user_id;
    const templateVars = {
      username: user.username
    };

    res.render("my-resources", templateVars);
      })


  return router;
}
