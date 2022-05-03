var express = require('express');
var router = express.Router();
const pool = require("../db");

/* POST login info. */
router.post('/', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await pool.query('SELECT * FROM "WormGym".user_info WHERE username = $1', [username]);
        
        if (user.rows[0] === undefined) {
            res.send('Username does not exists.');
        } else if (password !== user.rows[0].password) {
            res.send('Wrong password.');
        } else {
            res.send('Login successfully.');
        }
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
