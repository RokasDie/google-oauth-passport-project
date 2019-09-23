const pool = require("../config/database");

module.exports = async (queryText, queryValues, cb) => {
  const client = await pool.connect();
  try {
    const res = await client.query(queryText, queryValues);
    return cb(null, res.rows, res);
  } catch (err) {
    console.log("query error:", err);
    return cb(err);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
};
