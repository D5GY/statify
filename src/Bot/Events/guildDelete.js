const { Guild } = require('discord.js');
/**
   * @param { Guild } guild
   * @param { statify } statify
   */
module.exports = (guild) => {
  const statify = guild.client;
  statify.webhooks.guildDelete.send({
    embeds: [statify.response.embed.GUILD_DELETE(guild, statify)]
  }).catch((error) => {
    statify.logger.RED('bot', error);
  });
};