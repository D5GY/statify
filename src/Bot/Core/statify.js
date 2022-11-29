const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { Config } = require('../../config');
const { Logger } = require('../../Logger');

class statify extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent
      ],
      partials: [
        Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User
      ]
    });
    this.config = Config;
    this.logger = Logger
  }
  start() {
    super.login(this.config.DEVELOPMENT_MODE ? this.config.BOT.DEVELOPMENT.TOKEN : this.config.BOT.PRODUCTION.TOKEN).then(() => {
      this.logger.GREEN('bot', 'online');
    });
  }
}
module.exports = new statify;