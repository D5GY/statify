const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../../Core/statify');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('csgo')
    .setDescription('Get statistics for a CSGO player.')
    .addStringOption(option =>
      option.setName('steam-id')
        .setDescription('Provide the players Steam User ID.')
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
    const username = await interaction.options.getString('steam-id');
    if (!statify.Functions.isSteamID(username)) {
      return await interaction.editReply({
        embeds: [statify.response.embed.CSGO.STEAM_ID(statify)]
      })
    }
    const data = await statify.requestAPI.CSGO(username);
    const jsonData = JSON.parse(data);

    if (jsonData.errors && jsonData.errors[0].code.includes('NotFound')) {
      return await interaction.editReply({
        embeds: [statify.response.embed.CSGO.NOT_FOUND(username, statify)]
      });
    } else if (jsonData.errors && jsonData.errors[0]) {
      statify.logger.RED('bot', `CSGO: ${jsonData.errors[0]}`);
      statify.webhooks.errorLogs.send({
        embeds: [statify.response.embed.ERROR(`[CSGO]: ${jsonData.errors[0]}`)]
      });
      return await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('csgo lookup', statify)
      });
    }
    interaction.editReply({
      embeds: [statify.response.embed.CSGO.STATS(jsonData, statify)]
    });
  }
}