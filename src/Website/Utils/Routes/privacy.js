const express = require('express');
const { renderPage } = require('..');
const { isAuthenticated } = require('../Auth/Auth');
const router = express.Router();

router.get('/about/privacy', (req, res) => {
  renderPage(req, res, 'privacy.ejs', {
    title: 'statify - Privacy Policy',
    user: isAuthenticated ? req.user : null
  });
});

module.exports = router;