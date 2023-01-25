const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/dashboard/settings', (req, res) => {
  renderPage(req, res, 'settings.ejs', {
    title: 'statify - Settings'
  });
});

module.exports = router;