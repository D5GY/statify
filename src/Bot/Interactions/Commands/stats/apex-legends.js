const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../../Core/statify');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('apex-legends')
    .setDescription('Get statistics for a Apex Legends player.')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('Provide the players username.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('platform of the player.')
        .setChoices(
          { name: 'xbox', value: 'xbl' },
          { name: 'playstation', value: 'psn' },
          { name: 'pc', value: 'origin' }
        )
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
    const username = await interaction.options.getString('username');
    const platform = await interaction.options.getString('platform');
    const data = await statify.requestAPI.ApexLegends(username, platform);
    const jsonData = JSON.parse(data);
    
    if(jsonData.errors && jsonData.errors[0].code.includes('NotFound')) {
      return await interaction.editReply({
        embeds: [statify.response.embed.APEX_LEGENDS.NOT_FOUND(username, platform, statify)]
      });
    } else if (jsonData.errors && jsonData.errors[0]) {
      statify.logger.RED('bot', `APEX LEGENDS: ${jsonData.errors[0]}`);
      statify.webhooks.errorLogs.send({
        embeds: [statify.response.embed.ERROR(`[APEX LEGENDS]: ${jsonData.errors[0]}`)]
      });
      return await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('apex legends lookup', statify)
      });
    }
    interaction.editReply({
      embeds: [statify.response.embed.APEX_LEGENDS.STATS(jsonData, statify)]
    });
  }
}