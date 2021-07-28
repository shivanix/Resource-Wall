const db = require('../lib/db');

const getResources = () => {
  return db.query(`
  SELECT * FROM resources`)
    .then((results) => {
      return results.rows;
    });
};

const getResourcesById = (id) => {
  return db.query(`SELECT * FROM resources WHERE id = $1`, [id])
    .then((results) => {
      return results.rows;
    });
}

const getResourcesByOwnerId = (owner_id) => {
  return db.query(`SELECT * FROM resources
  WHERE owner_id = $1;`, [owner_id])
    .then((results) => {
      return results.rows;
    });
}

const getLikedResources = () => {
  return db.query(`SELECT * FROM resources
  JOIN likes ON resources.id = likes.resource_id
  JOIN users ON users.id = likes.user_id
  WHERE users.id = 1 AND is_liked = true;`, [])
    .then((results) => {
      return results.rows;
    });
}

module.exports = {
  getResources,
  getResourcesById,
  getResourcesByOwnerId
}
