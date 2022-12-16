const express = require('express');
const router = express.Router();
const { WebhookClient } = require('discord.js');
const { Config } = require('../../../config');
const { discordImageURL } = require('..');
const logoutWebhook = new WebhookClient({ id: Config.WEBHOOKS.LOGOUT_LOGS.ID, token: Config.WEBHOOKS.LOGOUT_LOGS.TOKEN });
router.get('/logout', (req, res, next) => {
  logoutWebhook.send({
    embeds: [{
      color: 0x417bd2,
      author: { name: 'statify logout' },
      thumbnail: { url: discordImageURL('avatars', req.user.id, req.user.avatar) },
      description: `User: <@${req.user.id}>\nUser Tag: ${req.user.username}#${req.user.discriminator}\nID: ${req.user.id}\nTime: <t:${Math.floor(Date.now() / 1000)}:R>`
    }]
  });
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;