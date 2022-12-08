const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/games', (req, res) => {
  renderPage(req, res, 'gamelist.ejs', {
    title: 'statify - Games List',
  });
});

module.exports = router;