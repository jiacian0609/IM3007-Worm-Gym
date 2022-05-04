var express = require('express');
var router = express.Router();
const pool = require("../db");

const { v4: uuidv4 } = require('uuid');

let online = [];

/* POST logout 
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
  });*/
  
  module.exports = router;