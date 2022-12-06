const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../../Core/statify');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('splitgate')
    .setDescription('Get statistics for a Splitgate player.')
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
          { name: 'pc', value: 'steam' }
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

    if (platform == 'steam' && !isSteamID(username)) {
      return await interaction.editReply({
        embeds: [statify.response.embed.SPLITGATE.STEAM_ID(statify)]
      });
    }

    const data = await statify.requestAPI.Splitgate(username, platform);
    const jsonData = JSON.parse(data);
    
    if(jsonData.errors && jsonData.errors[0].code.includes('NotFound')) {
      return await interaction.editReply({
        embeds: [statify.response.embed.SPLITGATE.NOT_FOUND(username, platform, statify)]
      });
    } else if (jsonData.errors && jsonData.errors[0]) {
      statify.logger.RED('bot', `SPLITGATE: ${jsonData.errors[0]}`);
      return await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('Splitgate lookup', statify)
      });
    }
    interaction.editReply({
      embeds: [statify.response.embed.SPLITGATE.STATS(jsonData, statify)]
    });
  }
}

function isSteamID(username) {
  const steamIDRegex = new RegExp(/^\d+\.?\d*$/);
  return steamIDRegex.test(username);
}