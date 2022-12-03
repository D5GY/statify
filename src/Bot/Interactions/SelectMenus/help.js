const { StringSelectMenuInteraction } = require('discord.js');
const statify = require('../../Core/statify');

module.exports = {
  data: {
    name: 'commandUsage'
  },
  /**
   * @param { StringSelectMenuInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    const selected = interaction.values[0];
    if (selected == 'r6s') {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [statify.response.embed.HELP.rainbow_six_siege(statify)]
      });
    }
  }
}