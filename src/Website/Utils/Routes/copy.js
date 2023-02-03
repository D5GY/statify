const express = require('express');
const { renderPage } = require('..');
const { isAuthenticated } = require('../Auth/Auth');
const router = express.Router();

router.get('/about/copyright', (req, res) => {
  renderPage(req, res, 'copy.ejs', {
    title: 'statify - Copyright',
    user: isAuthenticated ? req.user : null
  });
});

module.exports = router;