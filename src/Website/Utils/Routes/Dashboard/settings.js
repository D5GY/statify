const express = require('express');
const { renderPage, discordImageURL, calculatePermissions } = require('../../index');
const router = express.Router();
const { isAuthenticated } = require('../../Auth/Auth');

router.get('/dashboard/:id/settings', isAuthenticated, (req, res) => {
  const server = req.params.id;
  if (typeof req.user.guilds.find(({ id }) => id === server) == 'undefined') return res.redirect('/dashboard');
  renderPage(req, res, 'settings.ejs', {
    title: 'statify - Settings',
    user: req.user,
    discordImageURL,
    calculatePermissions,
    id: server
  });
});

module.exports = router;