const express = require('express');
const { renderPage, discordImageURL, calculatePermissions, requestApiGet } = require('../../index');
const router = express.Router();
const { isAuthenticated } = require('../../Auth/Auth');

router.get('/dashboard/:id/customize', isAuthenticated, async (req, res) => {
  const server = req.params.id;
  if (typeof req.user.guilds.find(({ id }) => id === server) == 'undefined') return res.redirect('/dashboard');
  const data = await requestApiGet('guild/get', { discordID: server });
  const data2 = await requestApiGet('guild/ws/get', { discordID: server });
  const wsData = JSON.parse(JSON.stringify(data2));
  renderPage(req, res, 'customize.ejs', {
    title: 'statify - Customization',
    user: req.user,
    discordImageURL,
    calculatePermissions,
    guild: { sql: { color: data.response[0].embed_color }, ws: JSON.parse(wsData.response) }
  });
});

module.exports = router;