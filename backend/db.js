const Pool = require("pg").Pool;

let db_name = "";

if(process.env.NODE_ENV === undefined) {
    db_name = "wormGym";
} else {
    db_name = "wormGym_test";
}
console.log('database name:', db_name);

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: db_name
});

module.exports = pool;