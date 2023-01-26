const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/about/privacy', (req, res) => {
  renderPage(req, res, 'privacy.ejs', {
    title: 'statify - Privacy Policy'
  });
});

module.exports = router;