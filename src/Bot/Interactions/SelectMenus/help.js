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
    } else if (selected == 'td2') {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [statify.response.embed.HELP.the_division_2(statify)]
      });
    } else if (selected == 'spg') {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [statify.response.embed.HELP.splitgate(statify)]
      });
    } else if (selected == 'apl') {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [statify.response.embed.HELP.apex_legends(statify)]
      });
    } else if (selected == 'csg') {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [statify.response.embed.HELP.csgo(statify)]
      });
    } else if (selected == 'coc') {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [statify.response.embed.HELP.clash_of_clans(statify)]
      });
    } else if (selected == 'mnc') {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [statify.response.embed.HELP.minecraft(statify)]
      });
    } else if (selected == 'frn') {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [statify.response.embed.HELP.fortnite(statify)]
      });
    }
  }
}