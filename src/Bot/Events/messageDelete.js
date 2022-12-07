const { MessageType, Message } = require('discord.js');
/**
  * @param { Message } message
  * * @param { statify } statify
  */
module.exports = (message) => {
  const statify = message.client;
  if (message.guild.id !== statify.config.BOT.STATIFY_GUILD_ID || message.type !== MessageType.Default) return;

  statify.webhooks.messageDelete.send({
    embeds: [statify.response.embed.MESSAGE_DELETE(message, statify)]
  }).catch((error) => {
    statify.emit('error', error);
  });
};