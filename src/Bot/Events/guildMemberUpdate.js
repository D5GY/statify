const statify = require("../Core/statify");
/**
 * @param { before } before 
 * @param { after } after 
 * @param { statify } statify
 */
module.exports = (before, after) => {
  statify.webhooks.nicknameUpdate.send({
    embeds: [statify.response.embed.GUILD_MEMBER_UPDATE(before, after, statify)]
  }).catch((error) => {
    statify.emit('error', error);
  });
};