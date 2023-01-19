const { Guild } = require('discord.js');
/**
  * @param { Guild } guild
  * @param { statify } statify
  */
module.exports = (guild) => {
  const statify = guild.client;
  statify.statifyAPI.POST_CREATE_GUILD(guild.id);
  statify.webhooks.guildCreate.send({
    embeds: [statify.response.embed.GUILD_CREATE(guild, statify)]
  }).catch((error) => {
    statify.logger.RED('bot', error);
  });
};