const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/about/creators', (req, res) => {
  renderPage(req, res, 'creators.ejs', {
    title: 'statify - About The Developers'
  });
});

module.exports = router;