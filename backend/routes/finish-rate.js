var express = require('express');
var router = express.Router();
const pool = require("../db");

router.get('/:username', async (req, res) => {
    try {
        // get user_id
        const {username} = req.params;
        const user =  await pool.query('SELECT * FROM "WormGym".user_info WHERE username = $1', [username]);
        const user_id = user.rows[0].user_id;

        // get all month
        const month = await pool.query(`SELECT EXTRACT(YEAR FROM month_trunc) AS year, EXTRACT(MONTH FROM month_trunc) as month
                                        FROM
                                        (
                                            SELECT date_trunc('month', date) AS month_trunc FROM "WormGym".fitness_program
                                            WHERE user_id = $1
                                            GROUP BY month_trunc
                                        ) AS mt`, [user_id]);
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