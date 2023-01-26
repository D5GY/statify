const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/about', (req, res) => {
  renderPage(req, res, 'about.ejs', {
    title: 'statify - About Us'
  });
});

module.exports = router;