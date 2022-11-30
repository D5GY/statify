const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Config } = require('../../config');
const { Logger } = require('../../Logger');
const { readdirSync } = require('fs');
const utils = require('./Utils');

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
    this.logger = Logger;
    this.response = {
      content: utils.content,
      embed: utils.embeds
    }

    this.eventsCount = 0;
    this.interactions = new Collection();
    this.interactionsData = [];
    this.interactionCount = 0;
  }
  loadEvents() {
    const eventDir = `${__dirname}/../Events`;
    const events = readdirSync(eventDir);
    for (const event of events) {
      if (!event.endsWith('.js')) continue;
      this.on(event.split('.')[0], require(`${eventDir}/${event}`));
      delete require.cache[require.resolve(`${eventDir}/${event}`)];
      this.eventsCount++;
    }
    this.logger.BLUE('bot', `Loaded ${this.eventsCount} ${this.eventsCount = 1 ? 'event' : 'events'}`);
  }
  loadInteractions() {
    const interactionDir = `${__dirname}/../Interactions`;
    const interactionsFolders = readdirSync(interactionDir);
    for (const folder of interactionsFolders) {
      const interactionsFiles = readdirSync(`${interactionDir}/${folder}`);
      for (const interactionFile of interactionsFiles) {
        const interaction = require(`${interactionDir}/${folder}/${interactionFile}`);
        this.interactions.set(interaction.data.name, interaction);
        this.interactionsData.push(interaction.data.toJSON());
        this.interactionCount++;
      }
    }
    this.logger.BLUE('bot', `Loaded ${this.interactionCount} ${this.interactionCount = 1 ? 'interaction' : 'interactions'}`);
  }
  start() {
    this.loadEvents();
    this.loadInteractions();
    super.login(this.config.DEVELOPMENT_MODE ? this.config.BOT.DEVELOPMENT.TOKEN : this.config.BOT.PRODUCTION.TOKEN);
  }
}
module.exports = new statify;