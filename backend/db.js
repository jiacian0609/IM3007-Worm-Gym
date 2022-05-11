const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "wnwjihndhwi2430",
    host: "localhost",
    port: 5432,
    database: "wormGym"
});

module.exports = pool;