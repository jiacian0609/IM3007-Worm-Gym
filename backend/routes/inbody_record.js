var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const pool = require("../db");

/* POST login info. */
router.get('/', async (req, res) => {
    var JWT = req.headers.authorization
    console.log(JWT)
    var payload = jwt.verify(JWT, "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a");
    var user_id = payload.Uid;

    //get the inbody record from database
    const inbody_record = await pool.query('SELECT * FROM "WormGym"."Inbody_record" WHERE user_id = $1', [user_id]);
    console.log(inbody_record.rows)

    //Send inbody record to frontend
    res.send(inbody_record.rows)
})



module.exports = router;