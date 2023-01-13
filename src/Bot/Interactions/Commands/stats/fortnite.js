const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../../Core/statify');
const { Client, Language } = require('fnapicom');
const Fortnite = new Client({
  language: Language.English,
  apiKey: statify.config.BOT.API_KEYS.FORTNITE
});
module.exports = {
  data: new SlashCommandBuilder()
    .setName('fortnite')
    .setDescription('Get statistics for a Fortnite player.')
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
          { name: 'epic', value: 'epic' }
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

    const data = await Fortnite.brStats({ name: username, accountType: platform, timeWindow: 'lifetime' });

    if(data.status == 404) {
      return await interaction.editReply({
        embeds: [statify.response.embed.FORTNITE.NOT_FOUND(username, platform, statify)]
      });
    } else if (data.status == 403) {
      return await interaction.editReply({
        embeds: [statify.response.embed.FORTNITE.STATS_PRIVATE(username, statify)]
      });
    } else if (data.status !== 200) {
      statify.logger.RED('bot', `FORTNITE: ${data}`);
      statify.webhooks.errorLogs.send({
        embeds: [statify.response.embed.ERROR(`FORTNITE: ${data}`, statify)]
      });
      await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('Fortnite lookup', statify)
      });
    }
    interaction.editReply({
      embeds: [statify.response.embed.FORTNITE.STATS(data.data, statify)]
    });
  }
}