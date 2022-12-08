const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('*', (req, res) => {
  renderPage(req, res, 'error.ejs', {
    title: 'statify - Error'
  });
});


module.exports = router;