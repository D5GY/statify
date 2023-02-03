const express = require('express');
const { renderPage, discordImageURL, calculatePermissions } = require('../../index');
const router = express.Router();
const { isAuthenticated } = require('../../Auth/Auth');

router.get('/dashboard/:id/settings', isAuthenticated, (req, res) => {
  const server = req.params.id;
  renderPage(req, res, 'settings.ejs', {
    title: 'statify - Settings',
    user: req.user,
    discordImageURL,
    calculatePermissions,
    id: server
  });
});

module.exports = router;