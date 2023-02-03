const express = require('express');
const { renderPage } = require('..');
const { isAuthenticated } = require('../Auth/Auth');
const router = express.Router();

router.get('/status', (req, res) => {
  renderPage(req, res, 'status.ejs', {
    title: 'statify - Status Page',
    user: isAuthenticated ? req.user : null
  });
});

module.exports = router;