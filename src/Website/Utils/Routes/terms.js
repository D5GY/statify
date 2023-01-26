const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/about/tos', (req, res) => {
  renderPage(req, res, 'terms.ejs', {
    title: 'statify - Terms Of Service'
  });
});

module.exports = router;