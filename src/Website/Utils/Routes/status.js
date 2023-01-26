const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/status', (req, res) => {
  renderPage(req, res, 'status.ejs', {
    title: 'statify - Status Page'
  });
});

module.exports = router;