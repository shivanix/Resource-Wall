const db = require('../lib/db');

const getResources = () => {
  return db.query(`
  SELECT * FROM resources`)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesById = (id) => {
  return db.query(`SELECT * FROM resources WHERE id = $1`, [id])
    .then((response) => {
      return response.rows[0];
    });
}

module.exports = {
  getResources,
  getResourcesById
}
