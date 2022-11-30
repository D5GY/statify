const statify = require('../Core/statify');
/**
 * 
 * @param { statify } statify
 */
module.exports = async (statify) => {
  statify.logger.GREEN('bot', `${statify.user.username} is online.`);
  if (statify.config.DEVELOPMENT_MODE) {
    statify.application.commands.set(statify.interactionsData, statify.config.BOT.STATIFY_GUILD_ID).catch((error) => {
      statify.logger.RED('bot', error);
    }).then(() => {
      statify.logger.CYAN('bot', 'Interaction commands set (developer)');
    });
  } else {
    statify.application.commands.set(statify.interactionsData).catch((error) => {
      statify.logger.RED('bot', error);
    }).then(() => {
      statify.logger.BLUE('bot', 'Interaction commands');
    });
  }
}