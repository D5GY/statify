const { Client, GatewayIntentBits, Partials, Collection, WebhookClient, AllowedMentionsTypes } = require('discord.js');
const { Config } = require('../../config');
const { Logger } = require('../../Logger');
const { readdirSync } = require('fs');
const utils = require('./Utils');
const Utils = require('./Utils');
const { GuildInvites, GuildMembers, GuildMessages, GuildPresences, Guilds, GuildWebhooks, MessageContent } = GatewayIntentBits;
const { Channel, GuildMember, Message, User } = Partials;


class statify extends Client {
  constructor() {
    super({
      intents: [ GuildInvites, GuildMembers, GuildMessages, GuildMessages, GuildPresences, GuildWebhooks, Guilds, MessageContent ],
      partials: [ Channel, GuildMember, Message, User ],
      presence: { afk: false, status: 'online' }
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
    this.response = { content: utils.content, embed: utils.embeds };
    this.requestAPI = new Utils.requestAPI(this.config.BOT.API_KEYS);

    this.webhooks = {
      suggest: new WebhookClient({ id: this.config.WEBHOOKS.SUGGESTION_SUBMIT.ID, token: this.config.WEBHOOKS.SUGGESTION_SUBMIT.TOKEN }),
      bugreport: new WebhookClient({ id: this.config.WEBHOOKS.BUGREPORT_SUBMIT.ID, token: this.config.WEBHOOKS.BUGREPORT_SUBMIT.TOKEN }),
      guildCreate: new WebhookClient({ id: this.config.WEBHOOKS.GUILD_JOIN.ID, token: this.config.WEBHOOKS.GUILD_JOIN.TOKEN }),
      guildDelete: new WebhookClient({ id: this.config.WEBHOOKS.GUILD_LEAVE.ID, token: this.config.WEBHOOKS.GUILD_LEAVE.TOKEN }),
      guildMemberAdd: new WebhookClient({ id: this.config.WEBHOOKS.JOIN_MEMBER.ID, token: this.config.WEBHOOKS.JOIN_MEMBER.TOKEN }),
      guildMemberRemove: new WebhookClient({ id: this.config.WEBHOOKS.LEAVE_MEMBER.ID, token: this.config.WEBHOOKS.LEAVE_MEMBER.TOKEN }),
      messageUpdate: new WebhookClient({ id: this.config.WEBHOOKS.MESSAGE_UPDATE.ID, token: this.config.WEBHOOKS.MESSAGE_UPDATE.TOKEN }),
      messageDelete: new WebhookClient({ id: this.config.WEBHOOKS.MESSAGE_DELETE.ID, token: this.config.WEBHOOKS.MESSAGE_DELETE.TOKEN }),
      nicknameUpdate: new WebhookClient({ id: this.config.WEBHOOKS.NICKNAME_UPDATE.ID, token: this.config.WEBHOOKS.NICKNAME_UPDATE.TOKEN }),
    };

    this.commandsData = [];
    this.modals = new Collection();
    this.selectMenus = new Collection();
    this.commands = new Collection();
    this.commandsCount = 0;
    this.eventsCount = 0;
    this.selectMenusCount = 0;
    this.modalsCount = 0;

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
    this.logger.BLUE('bot', `Loaded ${this.eventsCount} ${this.eventsCount == 1 ? 'Event' : 'Events'}`);
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
      } else if (interactionType == 'Modals') {
        const modalFiles = readdirSync(`${interactionDir}/${interactionType}`);
        for (const modalFile of modalFiles) {
          const modal = require(`${interactionDir}/${interactionType}/${modalFile}`);
          this.modals.set(modal.data.name, modal);
          this.modalsCount++;
        }
      }
    }
    this.logger.BLUE('bot', `Loaded ${this.commandsCount} ${this.commandsCount == 1 ? 'Command' : 'Commands'}`);
    this.logger.BLUE('bot', `Loaded ${this.selectMenusCount} ${this.selectMenusCount == 1 ? 'Select Menu' : 'Select Menus'}`);
    this.logger.BLUE('bot', `Loaded ${this.modalsCount} ${this.modalsCount == 1 ? 'Modal' : 'Modals'}`);
  }
  start() {
    this.loadEvents();
    this.loadInteractions();
    super.login(this.config.DEVELOPMENT_MODE ? this.config.BOT.DEVELOPMENT.TOKEN : this.config.BOT.PRODUCTION.TOKEN);
  }
}
module.exports = new statify;