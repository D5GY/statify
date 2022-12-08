const express = require('express');
const { renderPage } = require('../../');
const router = express.Router();

router.get('/admin', (req, res) => {
  renderPage(req, res, 'admin_dashboard.ejs', {
    title: 'statify - Admin Portal',
  });
});

module.exports = router;