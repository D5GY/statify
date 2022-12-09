const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../../Core/statify');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('minecraft')
    .setDescription('Lookup a Minecraft server.')
    .addStringOption(option =>
      option.setName('server')
        .setDescription('Provide the minecraft server ip.')
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
    const ip = await interaction.options.getString('server');

    const data = await statify.requestAPI.Minecraft(ip);
    const jsonData = JSON.parse(data);
    
    if (jsonData.error == 'Ping Failed') {
      return await interaction.editReply({
        embeds: [statify.response.embed.ERROR(`${statify.Emojis.ICON_RED} Could not find ${ip}`, statify)]
      });
    } else if (jsonData.error) {
      statify.logger.RED('bot', `MINECRAFT: ${jsonData}`);
      return await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('minecraft lookup', statify)
      });
    }

    await interaction.editReply({
      embeds: [statify.response.embed.MINECRAFT(jsonData, ip, statify)]
    });
  }
}