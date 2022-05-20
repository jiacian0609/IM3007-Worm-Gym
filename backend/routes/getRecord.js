var express = require('express');
var router = express.Router();
const pool = require("../db");
var jwt = require("jsonwebtoken");

router.get('/:date/:day', async function (req, res) {
	//Parameters
	//const JWT = req.headers.authorization
	const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOjEsIlVzZXJuYW1lIjoidXNlck9ORSIsIkVtYWlsIjoiYjA4MDAwMDAxQGdvb2dsZS5jb20iLCJpYXQiOjE2NTMwNTk1OTgsImV4cCI6MTY1MzA2Njc5OH0.yfOmhTRx8DN6d8kVCdEm0ISMjfXeXF7eAC2NxvoSPFA"
	const payload = jwt.verify(JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
	const user_id = payload.Uid;
	const date = req.params.date
	const day = req.params.day
	var startDate = ''
	var endDate = ''
	if (date.slice(8) >= 1 && date.slice(8) < 8) {
		startDate = date.slice(0, 8) + '01'
		endDate = date.slice(0, 8) + '07'
	} else if (date.slice(8) >= 8 && date.slice(8) < 15) {
		startDate = date.slice(0, 8) + '08'
		endDate = date.slice(0, 8) + '14'
	} else if (date.slice(8) >= 15 && date.slice(8) < 22) {
		startDate = date.slice(0, 8) + '15'
		endDate = date.slice(0, 8) + '21'
	} else {
		startDate = date.slice(0, 8) + '22'
		endDate = date.slice(0, 8) + '31'
	}
	process.env.TZ = "UTC8";
	// response to frontend
	var recordByDate = [{equip_id: 1, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 2, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 3, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 4, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 5, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 6, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 7, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 8, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 9, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 10, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 11, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 12, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 13, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 14, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 15, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 16, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 17, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 18, weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 19, weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 20, weight: 0, sets: 0, reps: 0, status: 'optional'}]
	
	if (day == 'free') {
		// Get training record from database
		const record = await pool.query(`SELECT * FROM "WormGym".fitness_record
										 WHERE "user_id" = $1 and "date" = $2 and "Day" = $3`, [user_id, date, day]);

		// Update training record
		for (let index = 0; index < record.rows.length; index++) {
			recordByDate[record.rows[index].equip_id - 1].weight = record.rows[index].weight
			recordByDate[record.rows[index].equip_id - 1].sets = record.rows[index].sets
			recordByDate[record.rows[index].equip_id - 1].reps = record.rows[index].reps
			recordByDate[record.rows[index].equip_id - 1].status = "finish"
		}
		
		// Send response to frontend
		res.send(recordByDate)
	}
	else {
		const record = await pool.query('SELECT * FROM "WormGym".fitness_record WHERE "user_id" = $1 and "date" BETWEEN $2 and $3 and "Day" = $4', [user_id, startDate, endDate, 'free']);
		res.send(menu.rows)
	}
})

module.exports = router;