const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../../Core/statify');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('brawl-stars')
    .setDescription('Get statistics for a Brawl Stars player.')
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
    const data = await statify.requestAPI.BrawlStars(username);
    const jsonData = await JSON.parse(data);
    if (jsonData.reason == 'notFound') {
      return await interaction.editReply({
        embeds: [statify.response.embed.BRAWL_STARS.NOT_FOUND(username, statify)]
      });
    }
    if (!jsonData) {
      await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('brawl stars lookup', statify)
      });
      statify.webhooks.errorLogs.send({
        embeds: [statify.response.embed.ERROR(`[BRAWL STARS]: ${jsonData}`)]
      });
      return statify.logger.YELLOW('bot', `[BRAWL STARS]: ${jsonData}`);
    }
    await interaction.editReply({
      embeds: [statify.response.embed.BRAWL_STARS.STATS(jsonData, statify)]
    });
  }
}