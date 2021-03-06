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
                return res.status(404).send('Username does not exist.');
            } else {
                encryptedPassword = user.rows[0].password;
            }
            resolve()
		});

        //if (!(await bcrypt.compare(password, encryptedPassword))) {
        await new Promise((resolve, reject) => {
            // Compare password
            if (!(password == encryptedPassword))
                return res.status(403).send("Password is wrong :(");
            resolve()
        });
        
        await new Promise(async (resolve, reject) => {
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
            resolve()
        });

        await new Promise((resolve, reject) => {
            res.send({'message': 'Login successfully.', 'JWT': token})
            resolve()
        });
    } catch (err) {
      console.error(err.message);
    }
  });
  
  module.exports = router;