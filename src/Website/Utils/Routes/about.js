const express = require('express');
const { renderPage } = require('..');
const { isAuthenticated } = require('../Auth/Auth');
const router = express.Router();

router.get('/about', (req, res) => {
  renderPage(req, res, 'about.ejs', {
    title: 'statify - About Us',
    user: isAuthenticated ? req.user : null
  });
});

module.exports = router;