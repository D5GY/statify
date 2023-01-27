const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/login', (req, res, next) => {
  passport.authenticate('discord', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  })(req, res, next)
});

module.exports = router;