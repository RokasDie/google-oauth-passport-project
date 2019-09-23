const { Pool } = require("pg");
// the connection information comes from .env file
const pool = new Pool();

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;
