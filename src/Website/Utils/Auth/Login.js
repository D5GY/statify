const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/api/login', (req, res, next) => {
  passport.authenticate('discord', {
    successRedirect: '/dashboard/index',
    failureRedirect: '/'
  })(req, res, next)
});

module.exports = router;