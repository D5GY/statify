const express = require('express');
const { renderPage, discordImageURL, calculatePermissions, requestApiGet } = require('../../index');
const router = express.Router();
const { isAuthenticated } = require('../../Auth/Auth');

router.get('/dashboard/:id/information', isAuthenticated, async (req, res) => {
  const server = req.params.id;
  if (typeof req.user.guilds.find(({ id }) => id === server) == 'undefined') return res.redirect('/dashboard');
  const data = await requestApiGet('guild/ws/get', { discordID: server });
  const parseData = JSON.parse(JSON.stringify(data));
  const data2 = await requestApiGet('guild/get', { discordID: server });
  const parseData2 = JSON.parse(JSON.stringify(data2));
  if (JSON.parse(parseData.response).code === 10004) res.redirect(`https://discord.com/oauth2/authorize?client_id=1040689166607982623&permissions=137439266881&scope=applications.commands%20bot&guild_id=${server}`);
  renderPage(req, res, 'information.ejs', {
    title: 'statify - Guild Information',
    user: req.user,
    discordImageURL,
    calculatePermissions,
    guild: { id: server, ws: parseData, sql: parseData2 }
  });
});

module.exports = router;