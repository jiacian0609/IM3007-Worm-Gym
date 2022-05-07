var express = require('express');
var router = express.Router();
const pool = require("../db");

// GET logout 
router.get('/', (req, res) => {
  try {
    res.cookie('jwt', '', {maxAge: 1}); // replace with blank token, expire in 1ms
    res.send('Logout successfully.')
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});
  
  module.exports = router;