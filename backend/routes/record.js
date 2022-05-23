var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const pool = require("../db");

router.post('/', async (req, res) => {
	var JWT = req.headers.authorization
	var payload = jwt.verify(JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
	var user_id = payload.Uid;
	const {equip_id, weight, reps, sets, date, day} = req.body;
	const input_date = new Date(date);
	
	// Insert record into database
	await pool.query(
		'INSERT INTO "WormGym"."fitness_record" (user_id, equip_id, weight, reps, sets, date, "Day") VALUES($1, $2, $3, $4, $5, $6, $7)'
		, [user_id, equip_id, weight, reps, sets, date, day]
	);
	
	if (day !== 'free') {
		// Update finish status
		// get start dates of programs
		const program_date = await pool.query(`SELECT DISTINCT TO_CHAR(date, 'yyyy-mm-dd') AS start_date
											   FROM "WormGym".fitness_program
											   WHERE user_id = $1
											   ORDER BY start_date`, [user_id]);
		const pd_list = program_date.rows;

		// get the start date of the program according to input
		let sd = undefined;
		for (let i = 0; i < pd_list.length; i++) {
			const pd = new Date(pd_list[i].start_date);
			const pd_end = new Date(pd_list[i].start_date);
			pd_end.setDate(pd_end.getDate() + 6);
			
			if (input_date >= pd && input_date <= pd_end) {
				sd = pd;
				//console.log(sd);
				break;
			}
		}
		
		// if the program exists
		if (sd !== undefined) {
			// check & update status
			let p_item = await pool.query(`SELECT equip_id, reps, sets
										   FROM "WormGym".fitness_program
										   WHERE user_id = $1 AND "date" = $2 AND "Day" = $3 AND equip_id = $4`, [user_id, sd, parseInt(day), equip_id]);
			p_item = p_item.rows;

			// if the equipment of certain day is in the program
			if (p_item.length > 0) {
				p_item = p_item[0];
				p_item.reps = p_item.reps.split(" ")[0];  // remove unit
				p_item.sets = p_item.sets.split(" ")[0];  // remove unit
				if (reps.split(" ")[0] >= p_item.reps && sets.split(" ")[0] >= p_item.sets) {
					await pool.query(`UPDATE "WormGym".fitness_program SET finish=true
									  WHERE user_id = $1 AND "date" = $2 AND "Day" = $3 AND equip_id = $4`, [user_id, sd, parseInt(day), equip_id]);
				}
			}
		}
	}

	//Send status to frontend
	res.status(200).send('Success');
})

module.exports = router;