var express = require('express');
var router = express.Router();
const pool = require("../db");
var jwt = require("jsonwebtoken");

router.get('/:date/:day', async function (req, res) {
	//Parameters
	const JWT = req.headers.authorization
	//const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOjEsIlVzZXJuYW1lIjoidXNlck9ORSIsIkVtYWlsIjoiYjA4MDAwMDAxQGdvb2dsZS5jb20iLCJpYXQiOjE2NTMwNjc0MjQsImV4cCI6MTY1MzA3NDYyNH0.YKaOGiUNPTzaCYuMa9y1hW7DIHlRI0hhOUgXAVBGlqg"
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
	var recordByDate = [{equip_id: 1, name: '橢圓機', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 2, name: '跑步機', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 3, name: '飛輪車', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 4, name: '雙槓抬腿機', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 5, name: '蝴蝶夾胸機', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 6, name: '直立式腳踏車', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 7, name: '臥式腳踏車', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 8, name: '划船機', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 9, name: '滾輪', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 10, name: '夾胸器', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 11, name: '啞鈴彎舉', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 12, name: '負重深蹲', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 13, name: '側腹旋', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 14, name: '腿推機', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 15, name: '滑輪下拉機', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 16, name: '啞鈴肩推', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 17, name: '啞鈴反握手腕彎舉', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 18, name: '舉槓臥推', weight: 0, sets: 0, reps: 0, status: 'optional'},
						{equip_id: 19, name: '捲腹', weight: 0, sets: 0, reps: 0, status: 'optional'}, 
						{equip_id: 20, name: '引體向上', weight: 0, sets: 0, reps: 0, status: 'optional'}]
	
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
		// Get training record from database
		const record = await pool.query('SELECT * FROM "WormGym".fitness_record WHERE "user_id" = $1 and "date" BETWEEN $2 and $3 and "Day" = $4', [user_id, startDate, endDate, day]);

		// Update training record
		for (let index = 0; index < record.rows.length; index++) {
			recordByDate[record.rows[index].equip_id - 1].weight = record.rows[index].weight
			recordByDate[record.rows[index].equip_id - 1].sets = record.rows[index].sets
			recordByDate[record.rows[index].equip_id - 1].reps = record.rows[index].reps
			recordByDate[record.rows[index].equip_id - 1].status = "finished"
		}

		// Get unfinished training menu from database
		const unfinishedMenu = await pool.query('SELECT * FROM "WormGym".fitness_program WHERE user_id = $1 and date = $2 and "Day" = $3 and finish = false', [user_id, startDate, day]);

		// Update training record
		for (let index = 0; index < unfinishedMenu.rows.length; index++) {
			recordByDate[unfinishedMenu.rows[index].equip_id - 1].sets = unfinishedMenu.rows[index].sets
			recordByDate[unfinishedMenu.rows[index].equip_id - 1].reps = unfinishedMenu.rows[index].reps
			recordByDate[unfinishedMenu.rows[index].equip_id - 1].status = "unfinished"
		}
		
		// Send response to frontend		
		res.send(recordByDate)
	}
})

module.exports = router;