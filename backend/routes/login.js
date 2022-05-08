var express = require('express');
var router = express.Router();
const pool = require("../db");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

/* POST login info. */
router.post('/', async (req, res) => {
    try {
        const {username, password} = req.body;
        var encryptedPassword = null;

        //Check whether the username has signed up
        const user = await pool.query('SELECT * FROM "WormGym".user_info WHERE username = $1', [username]);
        await new Promise((resolve, reject) => {
			if (user.rows[0] === undefined) {
                return res.send('Username does not exist.');
            } else {
                encryptedPassword = user.rows[0].password;
            }
            resolve()
		});

        //if (!(await bcrypt.compare(password, encryptedPassword))) {

        // Compare password
		if (!(password == encryptedPassword)) {
			return res.send("Password is wrong :(");
		} else {
            //Create token
            token = await jwt.sign(
                {
                    Uid: user.rows[0].user_id,
                    Username: username,
                    Email: user.rows[0].email
                },
                "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a",
                {
                    algorithm: 'HS256',
                    expiresIn: "2h"
                }
            );

            // Store token in cookie
            res.cookie('JWT', token, { httpOnly: true, secure: false })
            
            res.send('Login successfully.');
        }
    } catch (err) {
      console.error(err.message);
    }
  });
  
  module.exports = router;