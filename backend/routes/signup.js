var express = require('express');
var router = express.Router();
const pool = require("../db");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

// bring in user model
// let User = require('../models/user') //我們怎麼好像沒有models

//sign up process
router.post('/', async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;

	//(Optional)Check whether the email exists
	//Encrypt password
	var encryptedPassword = await bcrypt.hash(password, 10);

	//Insert data into DB
	await pool.query('INSERT INTO "WormGym".user_info("username", "password", "email") VALUES ($1, $2, $3)', [username, password, email]);

	//Create token
	var userID = await pool.query('SELECT user_id FROM "WormGym".user_info WHERE username = $1', [username]);
	var token = await jwt.sign(
		{
			Uid: userID,
			Username: username,
			Email: email
		},
		"b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a",
		{
			algorithm: 'HS256',
			expiresIn: "3h"
		}
	);

	//Store token in cookie
	res.cookie('jwt', token, { httpOnly: true, secure: true });
	//res.send(token)

	res.send("Sign up successfully.");
	
	/* Check input correctness
	req.checkBody('username', 'user name is required').Notempty()
	req.checkBody('password', 'password is required').Notempty()
	req.checkBody('email', 'email is required').Notempty()
	req.checkBody('email', 'email is not vaild').isEmail()
	
	let errors = req.validationErrors();

	if(errors){
		res.render('signup', {
			errors:errors
		});
	} else{
		let newUser = new User({
			username:username,
			password:password,
			email:email
		});
	}
	*/

	//應該不用bcrypt加密吧 D:
	//req.flash('success', 'You are now signed up and can login');
	//res.redirect('/login');
})

module.exports = router;