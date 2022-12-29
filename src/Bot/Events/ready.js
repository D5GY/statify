const { ActivityType } = require('discord.js');
const statify = require('../Core/statify');
/**
 * 
 * @param { statify } statify
 */
module.exports = async (statify) => {
  statify.logger.GREEN('bot', `${statify.user.username} is online.`);
  if (statify.config.DEVELOPMENT_MODE) {
    statify.application.commands.set(statify.commandsData, statify.config.BOT.STATIFY_GUILD_ID).catch((error) => {
      statify.logger.RED('bot', error);
    }).then(() => {
      statify.logger.CYAN('bot', 'Interaction commands set (developer)');
      statify.user.setPresence({ activities: [{ name: `DEV: v${require('../../../package.json').version}`, type: ActivityType.Watching }]});
    });
  } else {
    statify.application.commands.set(statify.commandsData).catch((error) => {
      statify.logger.RED('bot', error);
    }).then(() => {
      statify.logger.BLUE('bot', 'Interaction commands');
      statify.user.setPresence({ activities: [{ name: `statify.cc | v${require('../../../package.json').version}`, type: ActivityType.Watching }]});
      statify.webhooks.botLogs.send({
        embeds: [statify.response.embed.BOT_ONLINE(statify)]
      });
    });
  }
};