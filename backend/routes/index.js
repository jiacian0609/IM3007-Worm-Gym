var express = require('express');
var router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require('uuid');

let online = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST login info. */
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await pool.query('SELECT * FROM "WormGym".user_info WHERE username = $1', [username]);
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
  } catch (err) {
    console.error(err.message);
  }
});

/* POST logout */
router.post('/logout', (req, res) => {
  try {
    const {login_id} = req.body;
    const foundUser = online.find((user) => user.login_id === login_id);
    if (foundUser === undefined) {
      res.send({"message": "login_id error"});
    } else {
      online = online.filter((user) => user.login_id !== login_id);
      res.send({"message": "Logout successfully."});
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
