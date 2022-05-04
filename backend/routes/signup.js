var express = require('express');
var router = express.Router();
const pool = require("../db");

// bring in user model
// let User = require('../models/user') //我們怎麼好像沒有models

// sign up form
router.get('/signup', function(req, res){
    res.send('signup')
});

//sign up process
router.post('/signup', function (req, res) {
    const username = req.body.name;
    const password = req.body.name;
    const email = req.body.email;

    req.checkBody('username', 'user name is required').Notempty()
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

    //應該不用bcrypt加密吧
    req.flash('success', 'You are now signed up and can login');
    res.redirect('/login');
})

module.exports = router;