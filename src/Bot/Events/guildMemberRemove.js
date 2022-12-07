const { GuildMember } = require('discord.js');
/**
   * @param { GuildMember } member
   * @param { statify } statify
   */
module.exports = (member) => {
  const statify = member.client;
  if (member.guild.id !== statify.config.BOT.STATIFY_GUILD_ID) return;

  statify.webhooks.guildMemberRemove.send({
    embeds: [statify.response.embed.GUILD_MEMBER_REMOVE(member, statify)]
  }).catch((error) => {
    statify.emit('error', error);
  });
};