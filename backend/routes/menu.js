var express = require('express');
var router = express.Router();
const pool = require("../db");
var jwt = require("jsonwebtoken");
const e = require('express');

router.get('/:time', async function (req, res) {
    console.log("Test")
    //Parameters
	//var payload = await jwt.verify(req.cookies.JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
    var user_id = "1";
    console.log(req.params.time)
    
    //Get training menu from database
    const menu = await pool.query('SELECT * FROM "WormGym".fitness_program WHERE user_id = $1', [user_id]);
    console.log(menu.rows)

    //Send program back to frontend
    res.send(menu.rows)
})

module.exports = router;