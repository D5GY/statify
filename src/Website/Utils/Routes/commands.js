const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/commands', (req, res) => {
  renderPage(req, res, 'commands.ejs', {
    title: 'statify - Commands'
  });
});

module.exports = router;