const express = require('express');
const { renderPage, discordImageURL, calculatePermissions } = require('../../index');
const router = express.Router();
const { isAuthenticated } = require('../../Auth/Auth');

router.get('/dashboard', isAuthenticated, (req, res) => {
  renderPage(req, res, 'servers.ejs', {
    title: 'statify - Server Page',
    user: req.user,
    discordImageURL,
    calculatePermissions
  });
});

module.exports = router;