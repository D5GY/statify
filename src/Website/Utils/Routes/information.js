const express = require('express');
const { renderPage } = require('..');
const router = express.Router();

router.get('/dashboard/information', (req, res) => {
  renderPage(req, res, 'information.ejs', {
    title: 'statify - Guild Information'
  });
});

module.exports = router;