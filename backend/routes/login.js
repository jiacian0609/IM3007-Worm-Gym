var express = require('express');
var router = express.Router();
const pool = require("../db");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require('uuid');

let online = [];

/* POST login info. */
router.post('/', async (req, res) => {
    console.log("POST")
    try {
        const {username, password} = req.body;
        var encryptedPassword = null;

        //Check whether the username has signed up
        const user = await pool.query('SELECT * FROM "WormGym".user_info WHERE username = $1', [username]);
        await new Promise((resolve, reject) => {
            //console.log(user.rows)
			if (user.rows[0] === undefined) {
                return res.send('Username does not exist.');
            } else {
                encryptedPassword = user.rows[0].password
            }
            resolve()
		});

        //Compare password
		//if (!(await bcrypt.compare(password, encryptedPassword))) {
		//	return res.send("Password is wrong :(");
		//};

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

		//Store token in cookie
		res.cookie('JWT', token, { httpOnly: true, secure: true })
        res.send(token)
        /*
        let message = "";
        if (user.rows[0] === undefined) {
            message = 'Username does not exist.';
            res.send({message, username});
        } else if (password !== user.rows[0].password) {
            message = 'Wrong password.';
            res.send({message, username});
        } else {
            const login_id = uuidv4();
            online.push({username, login_id});
    
            message = 'Login successfully.';
            res.send({message, username, login_id});
        }
        */
    } catch (err) {
      console.error(err.message);
    }
  });
  
  module.exports = router;