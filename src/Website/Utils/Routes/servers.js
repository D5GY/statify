const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/servers', (req, res) => {
  renderPage(req, res, 'servers.ejs', {
    title: 'statify - Server Page'
  });
});

module.exports = router;