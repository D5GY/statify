const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const statify = require('../../../Core/statify');
const helpMenu = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId('commandUsage')
    .setMinValues(1)
    .setMaxValues(1)
    .setOptions([
      { label: 'Rainbow Six Siege', description: 'Shows how to use the Rainbow Six Siege command', value: 'r6s' },
      { label: 'The Divison 2', description: 'Shows how to use the The Division 2 command', value: 'td2' },
      { label: 'Splitgate', description: 'Shows how to use the Splitgate command', value: 'spg' },
      { label: 'Apex Legends', description: 'Shows how to use the Apex Legends command', value: 'apl' },
      { label: 'Csgo', description: 'Shows how to use the CSGO command', value: 'csg' },
      { label: 'Clash Of Clans', description: 'Shows how to use the Clash Of Clans command', value: 'coc' }
    ])
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows how to use statify commands'),
  /**
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    await interaction.deferReply({
      ephemeral: true
    });
    await interaction.editReply({
      components: [helpMenu],
      embeds: []
    });
  }
}