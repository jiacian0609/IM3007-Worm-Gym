var express = require('express');
var router = express.Router();
const pool = require("../db");

/* POST login info. */
router.get('/', async (req, res) => {
    console.log("Test")
    var user_id = "1";
    console.log(req.params.time)

    //get the inbody record from database
    const inbody_record = await pool.query('SELECT * FROM "WormGym".Inbody WHERE user_id = $1', [user_id]);
    console.log(inbody_record.rows)

    //Send inbody record to frontend
    res.send(inbody_record.rows)
})



module.exports = router;