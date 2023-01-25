const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/about/copyright', (req, res) => {
  renderPage(req, res, 'copy.ejs', {
    title: 'statify - Copyright'
  });
});

module.exports = router;