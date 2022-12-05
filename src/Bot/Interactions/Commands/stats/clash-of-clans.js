const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const statify = require('../../../Core/statify');

const buttons = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('coc_page1')
    .setLabel('Player Information')
    .setEmoji('1043167461782081677')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('coc_page2')
    .setLabel('Builder Base')
    .setEmoji('1043166714327748719')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('coc_page3')
    .setLabel('Clan Information')
    .setEmoji('1043167209079443568')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('coc_page4')
    .setLabel('Troop Levels')
    .setEmoji('1043172830474403881')
    .setDisabled(true)
    .setStyle(ButtonStyle.Primary)
);
const troopButtons = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('coc_troops_base')
    .setLabel('Base Troops')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('coc_troops_builder')
    .setLabel('Builder Base Troops')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('coc_troops_heroes')
    .setLabel('Hero Troops')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('coc_troops_spells')
    .setLabel('Base Spells')
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId('coc_back')
    .setStyle(ButtonStyle.Danger)
    .setLabel('Back')
);
module.exports = {
  data: new SlashCommandBuilder()
    .setName('clash-of-clans')
    .setDescription('Get statistics for a Clash Of Clans player.')
    .addStringOption(option =>
      option.setName('player-tag')
        .setDescription('Provide the players tag.')
        .setRequired(true)
    ),
  /**
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    await interaction.deferReply({
      ephemeral: false
    });
    let username = interaction.options.getString('player-tag');
    if (!username.startsWith('#')) username = `#${username}`;
    const data = await statify.requestAPI.ClashOfClans(username);
    const jsonData = await JSON.parse(data);
    if (jsonData.reason == 'notFound') {
      return await interaction.editReply({
        embeds: [statify.response.embed.CLASH_OF_CLANS.NOT_FOUND(username, statify)]
      });
    }
    if (!jsonData) {
      await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('clash of clans lookup', statify)
      });
      return statify.logger.YELLOW('bot', `[CLASH OF CLANS]: ${jsonData}`);
    }
    const townHallAttachment = new AttachmentBuilder(`Core/Utils/Images/Clash-Of-Clans/Home-Base/${jsonData.townHallLevel}.png`);
    const builderBaseAttachment = new AttachmentBuilder(`Core/Utils/Images/Clash-Of-Clans/Builder-Base/${jsonData.builderHallLevel}.png`);
    await interaction.editReply({
      embeds: [statify.response.embed.CLASH_OF_CLANS.HOME_BASE(jsonData, statify)],
      components: [buttons],
      files: [townHallAttachment]
    });

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter });
    collector.on('collect', async (i) => {
      if (i.customId == 'coc_page1') {
        await i.deferUpdate();
        await i.editReply({
          embeds: [statify.response.embed.CLASH_OF_CLANS.HOME_BASE(jsonData, statify)],
          components: [buttons],
          files: [townHallAttachment]
        });
      } else if (i.customId == 'coc_page2') {
        await i.deferUpdate();
        await i.editReply({
          embeds: [statify.response.embed.CLASH_OF_CLANS.BUILDER_BASE(jsonData, statify)],
          components: [buttons],
          files: [builderBaseAttachment]
        });
      } else if (i.customId == 'coc_page3') {
        await i.deferUpdate();
        await i.editReply({
          embeds: [statify.response.embed.CLASH_OF_CLANS.CLAN_INFO(jsonData, statify)],
          components: [buttons],
          files: []
        });
      }
    });
  }
}