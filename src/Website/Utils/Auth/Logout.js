const express = require('express');
const router = express.Router();

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    return next(err);
  });
  res.redirect('/');
});

module.exports = router;