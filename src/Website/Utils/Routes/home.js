const express = require('express');
const { renderPage } = require('..');
const { isAuthenticated } = require('../Auth/Auth');
const router = express.Router();

router.get('/', (req, res) => {
  renderPage(req, res, 'index.ejs', {
    title: 'statify - Home',
    user: isAuthenticated ? req.user : null
  });
});

module.exports = router;