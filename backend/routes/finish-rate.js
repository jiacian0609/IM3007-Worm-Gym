var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const pool = require("../db");

router.get('/', async (req, res) => {
    try {
        // get user_id
        var JWT = req.headers.authorization
        var payload = jwt.verify(JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
        var user_id = payload.Uid;
        
        // get programs
        const program_date = await pool.query(`SELECT DISTINCT TO_CHAR(date, 'yyyy-mm-dd') AS start_date
                                               FROM "WormGym".fitness_program
                                               WHERE user_id = $1
                                               ORDER BY start_date`, [user_id]);
        const pd_list = program_date.rows;

        for (let i = 0; i < pd_list.length; i++) {
            // get the start date of the program
            const sd = pd_list[i].start_date;

            // get records of that week
            const record = await pool.query(`SELECT equip_id, reps, sets, TO_CHAR(date, 'yyyy-mm-dd') AS r_date
                                         FROM "WormGym".fitness_record
                                         WHERE user_id = $1 AND ("date" BETWEEN $2 AND $2 + 6)
                                         ORDER BY r_date`, [user_id, sd]);
            let record_list = record.rows;
            if (record_list.length == 0) {
                //console.log('No record this week.');
                continue;
            }

            // set day of week
            let r_date_value = record_list[0].r_date;
            let day_value = 1;
            for (let j = 0; j < record_list.length; j++) {
                let r = record_list[j];
                if (r.r_date != r_date_value) {
                    day_value += 1;
                    r_date_value = r.r_date;
                }
                r.day = day_value;
                r.reps = r.reps.split(" ")[0];  // remove unit

                // check status
                let p_item = await pool.query(`SELECT equip_id, reps, sets
                                               FROM "WormGym".fitness_program
                                               WHERE user_id = $1 AND "date" = $2 AND "Day" = $3 AND equip_id = $4`, [user_id, sd, r.day, r.equip_id]);
                p_item = p_item.rows
                if (p_item.length > 0) {
                    p_item = p_item[0];
                    p_item.reps = p_item.reps.split(" ")[0];  // remove unit
                    if (r.reps >= p_item.reps && r.sets >= p_item.sets) {
                        await pool.query(`UPDATE "WormGym".fitness_program SET finish=true
                                          WHERE user_id = $1 AND "date" = $2 AND "Day" = $3 AND equip_id = $4`, [user_id, sd, r.day, r.equip_id]);
                    }
                }
            }
        }
        

        // get all month
        const month = await pool.query(`SELECT EXTRACT(YEAR FROM month_trunc) AS year, EXTRACT(MONTH FROM month_trunc) as month
                                        FROM
                                        (
                                            SELECT date_trunc('month', date) AS month_trunc FROM "WormGym".fitness_program
                                            WHERE user_id = $1
                                            GROUP BY month_trunc
                                        ) AS mt
                                        ORDER BY year, month`, [user_id]);
        let month_list = month.rows;

        // calculate finish rate of each month
        for(let i = 0; i < month_list.length; i++) {
            const finish = await pool.query(`SELECT finish AS status, COUNT(finish) AS cnt FROM "WormGym".fitness_program
                                             WHERE user_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3
                                             GROUP BY finish
                                             ORDER BY status`, [user_id, month_list[i].month, month_list[i].year]);

            let fc = 0, tc = 0;
            if (finish.rows.length === 1 && finish.rows[0].status === false) {
                fc = parseInt(finish.rows[0].cnt);
            } else if (finish.rows.length === 1 && finish.rows[0].status === true) {
                tc = parseInt(finish.rows[0].cnt);
            } else {    // 2
                fc = parseInt(finish.rows[0].cnt);
                tc = parseInt(finish.rows[1].cnt);
            }

            const rate = (Math.round(tc / (fc + tc) * 10000) / 100) + '%';

            // write into output array
            month_list[i].finish_rate = rate;
        }

        res.send(month_list);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;