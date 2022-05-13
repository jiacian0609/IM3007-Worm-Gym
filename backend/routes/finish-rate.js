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