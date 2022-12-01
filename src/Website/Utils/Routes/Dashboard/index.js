const express = require('express');
const { renderPage } = require('../../');
const { isAuthenticated } = require('../../Auth/Auth');
const router = express.Router();

router.get('/dashboard/index', isAuthenticated, (req, res) => {
  renderPage(req, res, 'dashboard.ejs', {
    title: 'statify - dashboard',
    user: req.user
  });
});

module.exports = router;