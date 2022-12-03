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
    this.commands = new Collection();
    this.commandsData = [];
    this.commandsCount = 0;
    this.selectMenus = new Collection();
    this.selectMenusCount = 0;
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
    this.logger.BLUE('bot', `Loaded ${this.eventsCount} ${this.eventsCount == 1 ? 'event' : 'events'}`);
  }
  loadInteractions() {
    const interactionDir = `${__dirname}/../Interactions`;
    const interactionTypes = readdirSync(interactionDir);
    for (let interactionType of interactionTypes) {
      if (interactionType == 'Commands') {
        const commandsFolder = readdirSync(`${interactionDir}/${interactionType}`);
        for (const commandFolder of commandsFolder) {
          const commandFiles = readdirSync(`${interactionDir}/${interactionType}/${commandFolder}`);
          for (const commandFile of commandFiles) {
            const command = require(`${interactionDir}/${interactionType}/${commandFolder}/${commandFile}`);
            this.commands.set(command.data.name, command);
            this.commandsData.push(command.data.toJSON());
            this.commandsCount++;
          }
        }
      } else if (interactionType == 'SelectMenus') {
        const SelectMenuFiles = readdirSync(`${interactionDir}/${interactionType}`);
        for (const SelectMenuFile of SelectMenuFiles) {
          const selectmenu = require(`${interactionDir}/${interactionType}/${SelectMenuFile}`);
          this.selectMenus.set(selectmenu.data.name, selectmenu);
          this.selectMenusCount++;
        }
      }
    }
    this.logger.BLUE('bot', `Loaded ${this.commandsCount} ${this.commandsCount == 1 ? 'command' : 'commands'}`);
    this.logger.BLUE('bot', `Loaded ${this.selectMenusCount} ${this.selectMenusCount == 1 ? 'select menu' : 'select menus'}`);
  }
  start() {
    this.loadEvents();
    this.loadInteractions();
    super.login(this.config.DEVELOPMENT_MODE ? this.config.BOT.DEVELOPMENT.TOKEN : this.config.BOT.PRODUCTION.TOKEN);
  }
}
module.exports = new statify;