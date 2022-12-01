const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res, next) => {
  next();
}, passport.authenticate('discord'));


module.exports = router;