const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  renderPage(req, res, 'dashboard.ejs', {
    title: 'statify - Management Panel'
  });
});

module.exports = router;