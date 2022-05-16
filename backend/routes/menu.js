var express = require('express');
var router = express.Router();
const pool = require("../db");
var jwt = require("jsonwebtoken");
const e = require('express');

router.get('/:time', async function (req, res) {
    //Parameters
	//var JWT = req.headers.authorization
    var JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOjEsIlVzZXJuYW1lIjoidXNlck9ORSIsIkVtYWlsIjoiYjA4MDAwMDAxQGdvb2dsZS5jb20iLCJpYXQiOjE2NTI2NjY0OTcsImV4cCI6MTY1MjY3MzY5N30.HrEewfup5VsaaV3x1p2D-SIqJIY9bgRigsn4Ovf_xMs"
    var payload = jwt.verify(JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
    var user_id = payload.Uid;
    var date = req.params.time
    console.log(date)
    process.env.TZ = "UTC8";

    // Get training menu from database
    if (date.length == 7) {
        const menu = await pool.query('SELECT * FROM "WormGym".fitness_program WHERE user_id = $1 and date = $2', [user_id, date + '-01']);
        res.send(menu.rows)
    }
    else {
        const menu = await pool.query('SELECT * FROM "WormGym".fitness_program WHERE user_id = $1 and date = $2', [user_id, date]);
        res.send(menu.rows)
    }
})

module.exports = router;