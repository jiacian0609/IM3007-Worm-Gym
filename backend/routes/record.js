var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const pool = require("../db");

router.post('/', async (req, res) => {
	var JWT = req.headers.authorization
	var payload = jwt.verify(JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
	var user_id = payload.Uid;
	const {equip_id, weight, reps, sets, date} = req.body;

	//Insert record into database
	await pool.query(
		'INSERT INTO "WormGym"."fitness_record" (user_id, equip_id, weight, reps, sets, date) VALUES($1, $2, $3, $4, $5, $6)'
		, [user_id, equip_id, weight, reps, sets, date]
	);

	//Send status to frontend
	res.status(200).send('Success');
})

module.exports = router;