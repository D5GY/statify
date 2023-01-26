const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/dashboard/customize', (req, res) => {
  renderPage(req, res, 'customize.ejs', {
    title: 'statify - Customization'
  });
});

module.exports = router;