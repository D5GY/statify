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


    this.Colors = {
      BLUE: "#417bd2",
      RED: "f8002e",
      YELLOW: "faff14",
      GREEN: "00f821"  
    }
    this.Emojis = {
        ICON_BLUE: '<:statify_logo_icon:1046841072824881193>',
        ICON_GREEN: '<:Statify_logo_icon_green:1047967763873931265>',
        ICON_RED: '<:Statify_logo_icon_red:1047967765413253181>',
        ICON_WHITE: '<:Statify_logo_icon_white:1047968756737003560>',
        ICON_BLACK: '<:Statify_logo_icon_black:1047968755071860856>',
        ICON_YELLOW: '<:Statify_logo_icon_yellow:1047968758322434058>'
    }

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