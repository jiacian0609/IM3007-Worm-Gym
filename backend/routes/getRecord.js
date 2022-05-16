var express = require('express');
var router = express.Router();
const pool = require("../db");
var jwt = require("jsonwebtoken");

router.get('/:time/:day', async function (req, res) {
    //Parameters
	//var JWT = req.headers.authorization
    var JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOjIsIlVzZXJuYW1lIjoidXNlclRXTyIsIkVtYWlsIjoiYjA4MDAwMDAyQGdvb2dsZS5jb20iLCJpYXQiOjE2NTI2Nzk0NzYsImV4cCI6MTY1MjY4NjY3Nn0.c5AStV5v2aXk-O8XZED118CWBILlEdTep1ezXGhS6Fc"
    var payload = jwt.verify(JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
    var user_id = payload.Uid;
    console.log(req.params)
    var date = req.params
    console.log(date)
    process.env.TZ = "UTC8";

    /*
    // Get training menu from database
    if (date.length == 7) {
        const menu = await pool.query('SELECT * FROM "WormGym".fitness_program WHERE user_id = $1 and date = $2', [user_id, date + '-01']);
        res.send(menu.rows)
    }
    else {
        const menu = await pool.query('SELECT * FROM "WormGym".fitness_program WHERE user_id = $1 and date = $2', [user_id, date]);
        res.send(menu.rows)
    }
    */
})

module.exports = router;