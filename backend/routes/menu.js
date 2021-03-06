var express = require('express');
var router = express.Router();
const pool = require("../db");
var jwt = require("jsonwebtoken");
const e = require('express');
const { all } = require('./getRecord');

router.get('/:time', async function (req, res) {
    try {
        //Parameters
        var JWT = req.headers.authorization
        //var JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOjEsIlVzZXJuYW1lIjoidXNlck9ORSIsIkVtYWlsIjoiYjA4MDAwMDAxQGdvb2dsZS5jb20iLCJpYXQiOjE2NTMzOTg3OTEsImV4cCI6MTY1MzQwNTk5MX0.lHdypT3FN6YuMtSGJoTUw3txWjbWF734HHSASkupNT0"
        
        var payload = jwt.verify(JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
        var user_id = payload.Uid;
        var date = req.params.time
        process.env.TZ = "UTC8";

        // Get training menu from database
        if (date == 'all') {
            const menu = await pool.query('SELECT DISTINCT date FROM "WormGym".fitness_program WHERE user_id = $1 ORDER BY date', [user_id]);
            res.send(menu.rows)
        }
        else {
            const menu = await pool.query('SELECT * FROM "WormGym".fitness_program WHERE user_id = $1 and date = $2', [user_id, date]);
            res.send(menu.rows)
        }

    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;