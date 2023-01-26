const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../../Core/statify');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('clash-royale')
    .setDescription('Get statistics for a Clash Royale player.')
    .addStringOption(option =>
      option.setName('player-tag')
        .setDescription('Provide the players tag.')
        .setRequired(true)
    ),
  /**
   * 
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    await interaction.deferReply({
      ephemeral: false
    });
    let username = interaction.options.getString('player-tag');
    if (!username.startsWith('#')) username = `#${username}`;
    const data = await statify.requestAPI.ClashRoyale(username);
    const jsonData = await JSON.parse(data);
    if (jsonData.reason == 'notFound') {
      return await interaction.editReply({
        embeds: [statify.response.embed.CLASH_ROYALE.NOT_FOUND(username, statify)]
      });
    } else if (jsonData.reason == 'accessDenied') {
      await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('clash royale lookup', statify)
      });
      statify.webhooks.errorLogs.send({
        embeds: [statify.response.embed.ERROR('CLASH ROYALE: Invalid authorization', statify)]
      });
      return statify.logger.RED('bot', 'CLASH ROYALE: Invalid authorization');
    }
    if (!jsonData) {
      await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('clash royale lookup', statify)
      });
      statify.webhooks.errorLogs.send({
        embeds: [statify.response.embed.ERROR(`[CLASH ROYALE]: ${jsonData}`, statify)]
      });
      return statify.logger.YELLOW('bot', `[CLASH ROYAL]: ${jsonData}`);
    }
    await interaction.editReply({
      embeds: [statify.response.embed.CLASH_ROYALE.STATS(jsonData, statify)]
    });
  }
}