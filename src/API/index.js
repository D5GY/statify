const express = require('express');
const { Config } = require('../config');
const { Logger } = require('../Logger');
const app = express();
const { WebhookClient } = require('discord.js');
const apiWebhook = new WebhookClient({ id: Config.WEBHOOKS.API_LOGS.ID, token: Config.WEBHOOKS.API_LOGS.TOKEN });
const apiError = new WebhookClient({ id: Config.WEBHOOKS.API_ERRORS.ID, token: Config.WEBHOOKS.API_ERRORS.TOKEN });
const sqlLog = new WebhookClient({ id: Config.WEBHOOKS.SQL_LOGS.ID, token: Config.WEBHOOKS.SQL_LOGS.TOKEN });
const staff = require('./Utils/Routes/staff');
const misc = require('./Utils/Routes/miscellaneous');
const guild = require('./Utils/Routes/guild');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/staff', staff.get);
app.delete('/api/staff/:discordID', staff.delete);
app.post('/api/staff', staff.post);

app.post('/api/guild/create', guild.create);
app.get('/api/guild/get', guild.get_guild);
app.post('/api/guild/cmd', guild.increase_cmd_count);
app.delete('/api/guild/delete', guild.delete);

app.post('/api/suggest', misc.postSuggest);

app.listen(Config.API.PORT, () => {
  Logger.GREEN('API', 'Online');
  if (!Config.DEVELOPMENT_MODE) apiWebhook.send({
    embeds: [{
      color: 0x417bd2,
      author: { name: 'statify API' },
      description: `API online using proxy port ${Config.API.PORT}\nTime: <t:${Math.floor(Date.now() / 1000)}:R>`
    }]
  });
});