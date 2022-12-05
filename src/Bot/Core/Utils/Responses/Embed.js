const { EmbedBuilder } = require('discord.js');
const statify = require('../../statify');
module.exports = {
  /**
   * @param { statify } statify
   */
  ERROR: (error, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setDescription(error);
  },
  ping: (statify, ClientPing) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setDescription(`${statify.Emojis.ICON_GREEN} My API ping is ${statify.ws.ping}\n${statify.Emojis.ICON_GREEN} My Client ping is ${ClientPing}`);
  },
  rainbow_six_siege_general: (data, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: `stats for ${data.name}`, iconURL: data.header ?? statify.user.avatarURL(), url: 'https://statify.cc/' })
      .setFields(
        { name: 'Player Information', value: `> Level: ${data.level}\n> Total XP: ${data.total_xp}\n> Wins: ${data.wins}\n> Losses: ${data.losses}\n> W/L: ${data.win_}\n> Time Played: ${data.time_played}\n> Total Games: ${data.matches_played}`, inline: true },
        { name: 'Kills & Deaths', value: `> Kills: ${data.kills}\n> Deaths: ${data.deaths}\n> K/D: ${data.kd}\n> Headshots: ${data.headshots}\n> Blind Kills: ${data.blind_kills}\n> Knife Kills: ${data.melee_kills}`, inline: true }
      )
      .setFooter({ text: 'stats lookup based on general' })
      .setTimestamp();
  },
  rainbow_six_siege_ranked: (data, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: `stats for ${data.name}`, iconURL: data.header ?? statify.user.avatarURL(), url: 'https://statify.cc/' })
      .addFields(
        { name: 'Kills & Deaths', value: `> Kills: ${data.kills}\n> Deaths: ${data.deaths}\n> K/D: ${data.kd}\n> Kills per game: ${data.kills_match}`, inline: true },
        { name: 'Ranked Stats', value: `> Wins: ${data.wins}\n> Losses: ${data.losses}\n> W/L: ${data.win_}\n> MMR: ${data.mmr}\n> Rank: ${data.rank}`, inline: true }
      )
      .setThumbnail(data.rank_img)
      .setFooter({ text: 'stats lookup based on ranked' })
      .setTimestamp();
  },
  HELP: {
    rainbow_six_siege: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Useage', value: '/rainbow-six-siege `username:` `platform:`' },
          { name: 'Example', value: '/rainbow-six-siege `username: csgo` `platform: xbox`' }
        )
    }
  },
  SUGGESTION_SUBMIT: (platform, suggestion, user, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: `new suggestion`, url: 'https://statify.cc/', iconURL: user.avatarURL() ?? statify.user.avatarURL() })
      .setFields(
        { name: 'platform', value: `${platform}`, inline: true },
        { name: 'User', value: `Tag: ${user.tag}\nID: ${user.id}\nUser: ${user}`, inline: true },
        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
        { name: 'suggestion', value: `${suggestion}` }
      );
  },
  BUG_SUBMIT: (platform, bug, user, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.RED)
      .setAuthor({ name: `new bug found`, url: 'https://statify.cc/', iconURL: user.avatarURL() ?? statify.user.avatarURL() })
      .setFields(
        { name: 'platform', value: `${platform}`, inline: true },
        { name: 'User', value: `Tag: ${user.tag}\nID: ${user.id}\nUser: ${user}`, inline: true },
        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
        { name: 'Bug', value: `${bug}` }
      );
  },
  CLASH_OF_CLANS: {
    NOT_FOUND: (username, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} Player **${username}** not found!`);
    },
    HOME_BASE: (data, statify) => {
      const embed = new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setTitle(`Lookup for ${data.name}`)
      .setFields(
        { name: 'Level', value: `> ${data.expLevel}`, inline: true },
        { name: 'Town Hall', value: `> ${data.townHallLevel}`, inline: true },
        { name: 'trophies', value: `> Current: ${data.trophies}\n> Best: ${data.bestTrophies}`, inline: true }
      )
      .setThumbnail(`attachment://${data.townHallLevel}.png`)
      .setFooter({ text: 'page 1 - Player Information' });
    if (data.league) embed.addFields({ name: 'League', value: `> ${data.league.name}`, inline: true });
    return embed;
    },
    BUILDER_BASE: (data, statify) => {
      return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: `Lookup for ${data.name}`, iconURL: statify.user.avatarURL(), url: 'https://statify.cc/' })
      .setFields(
        { name: 'Builder Hall', value: `> ${data.builderHallLevel}`, inline: true },
        { name: 'Trophies', value: `> ${data.versusTrophies}`, inline: true },
        { name: 'Best Trophies', value: `> ${data.bestVersusTrophies}`, inline: true },
        { name: 'Total Battle Wins', value: `> ${data.versusBattleWins}`, inline: true }
      )
      .setThumbnail(`attachment://${data.builderHallLevel}.png`)
      .setFooter({ text: 'Page 2 - Builder Base' });
    }, 
    CLAN_INFO: (data, statify) => {
      if (!data.clan) return this.ERROR(`${statify.Emojis.ICON_WHITE} ${data.name} is not in a clan.`);
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: `Lookup for ${data.name}`, iconURL: statify.user.avatarURL(), url: 'https://statify.cc/' })
        .setFields(
          { name: 'Clan Name', value: `> ${data.clan.name}`, inline: true },
          { name: 'Clan Tag', value: `> ${data.clan.tag}`, inline: true },
          { name: 'Clan Level', value: `> ${data.clan.clanLevel}`, inline: true },
          { name: 'Clan Role', value: `> ${data.role}`, inline: true },
          { name: 'Clan War Stars', value: `> ${data.warStars}`, inline: true },
          { name: 'Troops Donated', value: `> ${data.donations}`, inline: true },
          { name: 'Troops Received', value: `> ${data.donationsReceived}`, inline: true }
        )
        .setThumbnail(data.clan.badgeUrls.small)
        .setFooter({ text: 'Page 3 - Clan Stats' });
    }
  }
}