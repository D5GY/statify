const { EmbedBuilder, Guild } = require('discord.js');
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
  GUILD_MEMBER_ADD: (member, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.GREEN)
      .setTitle('New Member')
      .setFields(
        { name: 'Member', value: `User: ${member.user} (${member.user.tag}) \n ID: ${member.user.id} \n isBot: ${member.user.bot}`, inline: false },
        { name: 'Account Creation Date', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`, inline: false }
      )
      .setThumbnail(member.user.avatarURL() ?? statify.user.avatarURL())
      .setTimestamp()
  },
  GUILD_MEMBER_REMOVE: (member, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.RED)
      .setTitle('Member Left')
      .setFields(
        { name: 'Member', value: `User: ${member.user} (${member.user.tag}) \n ID: ${member.user.id} \n isBot: ${member.user.bot}`, inline: false },
        { name: 'Join Date', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`, inline: false }
      )
      .setThumbnail(member.user.avatarURL() ?? statify.user.avatarURL())
      .setTimestamp()
  },
  GUILD_CREATE: (guild, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.GREEN)
      .setTitle('statify Joined A Server')
      .setFields(
        { name: 'Server', value: `Guild Name: ${guild.name} \n Guild ID: ${guild.id} \n Guild Members: ${guild.memberCount}` },
        { name: 'Guild Creation Date', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F> (<t:${Math.floor(guild.createdTimestamp / 1000)}:R>)`, inline: false }
      )
      .setThumbnail(guild.iconURL() ?? statify.user.avatarURL())
      .setTimestamp()
  },
  GUILD_DELETE: (guild, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.GREEN)
      .setTitle('statify Was Removed From A Server')
      .setFields(
        { name: 'Server', value: `Guild Name: ${guild.name} \n Guild ID: ${guild.id} \n Guild Members: ${guild.memberCount}` },
        { name: 'Guild Join Date', value: `<t:${Math.floor(guild.joinedTimestamp / 1000)}:F> (<t:${Math.floor(guild.joinedTimestamp / 1000)}:R>)`, inline: false }
      )
      .setThumbnail(guild.iconURL() ?? statify.user.avatarURL())
      .setTimestamp()
  },
  MESSAGE_UPDATE: (oldMessage, newMessage, statify) => {
    return new EmbedBuilder()
    .setColor(statify.Colors.BLUE)
    .setTitle('Edited Message')
    .setDescription(`[Jump To Message](${oldMessage.url})`)
    .setFields(
      { name: 'Member', value: `User: ${oldMessage.author} \n ID: ${oldMessage.author.id}` },
      { name: 'Old Message Content', value: `${oldMessage}`},
      { name: 'New Message Content', value: `${newMessage}`}
    )
    .setThumbnail(oldMessage.author.avatarURL() ?? statify.user.avatarURL())
    .setTimestamp()
  },
  MESSAGE_DELETE: (message, statify) => {
    return new EmbedBuilder()
    .setColor(statify.Colors.BLUE)
    .setTitle('Deleted Message')
    .setDescription(`Channel: ${message.channel}`)
    .setFields(
      { name: 'Member', value: `User: ${message.author} \n ID: ${message.author.id}`},
      { name: 'Delete Message Content', value: `${message.content}`},
    )
    .setThumbnail(message.author.avatarURL() ?? statify.user.avatarURL())
    .setTimestamp()
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
          { name: 'Usage', value: '/rainbow-six-siege `username:` `platform:`' },
          { name: 'Example', value: '/rainbow-six-siege `username: csgo` `platform: xbox`' }
        )
    },
    the_division_2: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/division-2 `username:` `platform:`' },
          { name: 'Example', value: '/division-2 `username: RoGuETXXRXCk` `platform: xbox`' }
        )
    },
    splitgate: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/splitgate `username:` `platform:`' },
          { name: 'Example', value: '/splitgate `username: LyK1Nw0Lf` `platform: xbox`' }
        )
    },
    apex_legends: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/apex-legends `username:` `platform:`' },
          { name: 'Example', value: '/apex-legends `username: maujeh` `platform: xbox`' }
        )
    },
    csgo: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/csgo `username:`' },
          { name: 'Example', value: '/csgo `username: iriaisa`' }
        )
    },
    clash_of_clans: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/clash-of-clans `player-tag:`' },
          { name: 'Example', value: '/clash-of-clans `player-tag: #8J9RQGLUC`' }
        )
    },
  },
  SUGGESTION_SUBMIT: (platform, suggestion, user, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: `New Suggestion`, url: 'https://statify.cc/', iconURL: user.avatarURL() ?? statify.user.avatarURL() })
      .setFields(
        { name: 'User Information', value: `Tag: ${user.tag}\nID: ${user.id}\nUser: ${user}`, inline: false },
        { name: 'Suggestion', value: `${suggestion}`, inline: false },
        { name: 'Platform', value: `${platform}`, inline: true },
        { name: 'Time Submitted', value: `<t:${Math.floor(Date.now() / 1000)}:F> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true },
      );
  },
  BUG_SUBMIT: (platform, bug, user, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.RED)
      .setAuthor({ name: `Bug Reported`, url: 'https://statify.cc/', iconURL: user.avatarURL() ?? statify.user.avatarURL() })
      .setFields(
        { name: 'User Information', value: `Tag: ${user.tag}\nID: ${user.id}\nUser: ${user}`, inline: false },
        { name: 'Bug', value: `${bug}`, inline: false },
        { name: 'Platform', value: `${platform}`, inline: true },
        { name: 'Time Submitted', value: `<t:${Math.floor(Date.now() / 1000)}:F> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true },
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
  },
  APEX_LEGENDS: {
    NOT_FOUND: (username, platform, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on ${platform}`);
    },
    STATS: (data, statify) => {
      const apexStats = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.data.platformInfo.platformUserHandle}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.data.platformInfo.avatarUrl ?? statify.user.avatarURL });

      const segment = data.data.segments[0];

      if (segment) {
        if (segment.stats.level) apexStats.addFields({ name: 'Level', value: `${segment.stats.level.displayValue}`, inline: true });
        if (segment.stats.kills) apexStats.addFields({ name: 'Kills', value: `${segment.stats.kills.displayValue}`, inline: true });
        if (segment.stats.killsPerMatch) apexStats.addFields({ name: 'Kills Per Match', value: `${segment.stats.killsPerMatch.displayValue}`, inline: true });
        if (segment.stats.winningKills) apexStats.addFields({ name: 'Winning Kills', value: `${segment.stats.winningKills.displayValue}`, inline: true });
        if (segment.stats.killsAsKillLeader) apexStats.addFields({ name: 'Kills As Kill Leader', value: `${segment.stats.killsAsKillLeader.displayValue}`, inline: true });
        if (segment.stats.damage) apexStats.addFields({ name: 'Total Damage', value: `${segment.stats.damage.displayValue}`, inline: true });
        if (segment.stats.points) apexStats.addFields({ name: 'Points', value: `${segment.stats.points.displayValue}`, inline: true });
        if (segment.stats.assists) apexStats.addFields({ name: 'Assists', value: `${segment.stats.assists.displayValue}`, inline: true });
        if (segment.stats.finishers) apexStats.addFields({ name: 'Finishers', value: `${segment.stats.finishers.displayValue}`, inline: true });
        if (segment.stats.deaths) apexStats.addFields({ name: 'Deaths', value: `${segment.stats.deaths.displayValue}`, inline: true });
        if (segment.stats.damageDealt) apexStats.addFields({ name: 'Damage Dealt', value: `${segment.stats.damageDealt.displayValue}`, inline: true });
        if (segment.stats.matchesPlayed) apexStats.addFields({ name: 'Matches Played', value: `${segment.stats.matchesPlayed.displayValue}`, inline: true });
        if (segment.stats.timePlayed) apexStats.addFields({ name: 'Time Played', value: `${segment.stats.timePlayed.displayValue}`, inline: true });
      } else if (!segment) {
        apexStats.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
      }

      return apexStats;
    }
  },
  CSGO: {
    NOT_FOUND: (username, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on steam`);
    },
    STATS: (data, statify) => {
      const csgoStats = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.data.platformInfo.platformUserHandle}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.data.platformInfo.avatarUrl ?? statify.user.avatarURL() });

      const segment = data.data.segments[0];

      if (segment) {
        if (segment.stats.kills) csgoStats.addFields({ name: 'Kills', value: `${segment.stats.kills.displayValue}`, inline: true });
        if (segment.stats.deaths) csgoStats.addFields({ name: 'Deaths', value: `${segment.stats.deaths.displayValue}`, inline: true });
        if (segment.stats.kd) csgoStats.addFields({ name: 'K/D', value: `${segment.stats.kd.displayValue}`, inline: true });
        if (segment.stats.score) csgoStats.addFields({ name: 'Score', value: `${segment.stats.score.displayValue}`, inline: true });
        if (segment.stats.damage) csgoStats.addFields({ name: 'Damage', value: `${segment.stats.damage.displayValue}`, inline: true });
        if (segment.stats.headshots) csgoStats.addFields({ name: 'Headshots', value: `${segment.stats.headshots.displayValue}`, inline: true });
        if (segment.stats.shotsFired) csgoStats.addFields({ name: 'Shots Fired', value: `${segment.stats.shotsFired.displayValue}`, inline: true });
        if (segment.stats.shotsHit) csgoStats.addFields({ name: 'Shots Hit', value: `${segment.stats.shotsHit.displayValue}`, inline: true });
        if (segment.stats.shotsAccuracy) csgoStats.addFields({ name: 'Accuracy', value: `${segment.stats.shotsAccuracy.displayValue}`, inline: true });
        if (segment.stats.bombsPlanted) csgoStats.addFields({ name: 'Bombs Planted', value: `${segment.stats.bombsPlanted.displayValue}`, inline: true });
        if (segment.stats.bombsDefused) csgoStats.addFields({ name: 'Bombs Defused', value: `${segment.stats.bombsDefused.displayValue}`, inline: true });
        if (segment.stats.matchesPlayed) csgoStats.addFields({ name: 'Matches Played', value: `${segment.stats.matchesPlayed.displayValue}`, inline: true });
        if (segment.stats.wins) csgoStats.addFields({ name: 'Wins', value: `${segment.stats.wins.displayValue}`, inline: true });
        if (segment.stats.losses) csgoStats.addFields({ name: 'Losses', value: `${segment.stats.losses.displayValue}`, inline: true });
        if (segment.stats.ties) csgoStats.addFields({ name: 'Ties', value: `${segment.stats.ties.displayValue}`, inline: true });
        if (segment.stats.wlPercentage) csgoStats.addFields({ name: 'W/L', value: `${segment.stats.wlPercentage.displayValue}`, inline: true });
        if (segment.stats.mvp) csgoStats.addFields({ name: 'MVP', value: `${segment.stats.mvp.displayValue}`, inline: true });
        if (segment.stats.timePlayed) csgoStats.addFields({ name: 'Time Played', value: `${segment.stats.timePlayed.displayValue}`, inline: true });
      } else if (!segment) {
        csgoStats.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
      }

      return csgoStats;
    }
  },
  DIVISION_2: {
    NOT_FOUND: (username, platform, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on ${platform}`);
    },
    STATS: (data, statify) => {
      const divisionStats = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.data.platformInfo.platformUserHandle}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.data.platformInfo.avatarUrl ?? statify.user.avatarURL() });

      const segment = data.data.segments[0];

      if (segment) {
        if (segment.stats.killsPvP) divisionStats.addFields({ name: 'Player Kills', value: `${segment.stats.killsPvP.displayValue}`, inline: true });
        if (segment.stats.killsNpc) divisionStats.addFields({ name: 'NPC Kills', value: `${segment.stats.killsNpc.displayValue}`, inline: true });
        if (segment.stats.headshots) divisionStats.addFields({ name: 'Headshots', value: `${segment.stats.headshots.displayValue}`, inline: true });
        if (segment.stats.itemsLooted) divisionStats.addFields({ name: 'Items Looted', value: `${segment.stats.itemsLooted.displayValue}`, inline: true });
        if (segment.stats.highestPlayerLevel) divisionStats.addFields({ name: 'Level', value: `${segment.stats.highestPlayerLevel.displayValue}`, inline: true });
        if (segment.stats.specialization) divisionStats.addFields({ name: 'Specialization', value: `${segment.stats.specialization.displayValue}`, inline: true });
        if (segment.stats.xPTotal) divisionStats.addFields({ name: 'Total XP', value: `${segment.stats.xPTotal.displayValue}`, inline: true });
        if (segment.stats.timePlayed) divisionStats.addFields({ name: 'Time Played', value: `${segment.stats.timePlayed.displayValue}`, inline: true });
      } else if (!segment) {
        divisionStats.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
      }

      return divisionStats;
    }
  },
  SPLITGATE: {
    STEAM_ID: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} please provide a steam user-id to lookup.`);
    },
    NOT_FOUND: (username, platform, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on ${platform}`);
    },
    STATS: (data, statify) => {
      const splitgateStats = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.data.platformInfo.platformUserHandle}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.data.platformInfo.avatarUrl ?? statify.user.avatarURL() });

      const segment = data.data.segments[0];

      if (segment) {
        if (segment.stats.kills) splitgateStats.addFields({ name: 'Kills', value: `${segment.stats.kills.displayValue}`, inline: true });
        if (segment.stats.deaths) splitgateStats.addFields({ name: 'Deaths', value: `${segment.stats.deaths.displayValue}`, inline: true });
        if (segment.stats.assists) splitgateStats.addFields({ name: 'Assists', value: `${segment.stats.assists.displayValue}`, inline: true });
        if (segment.stats.points) splitgateStats.addFields({ name: 'Points', value: `${segment.stats.points.displayValue}`, inline: true });
        if (segment.stats.damageDealt) splitgateStats.addFields({ name: 'Damage Dealt', value: `${segment.stats.damageDealt.displayValue}`, inline: true });
        if (segment.stats.wins) splitgateStats.addFields({ name: 'Wins', value: `${segment.stats.wins.displayValue}`, inline: true });
        if (segment.stats.losses) splitgateStats.addFields({ name: 'Losses', value: `${segment.stats.losses.displayValue}`, inline: true });
        if (segment.stats.matchesPlayed) splitgateStats.addFields({ name: 'Matches Played', value: `${segment.stats.matchesPlayed.displayValue}`, inline: true });
        if (segment.stats.timePlayed) splitgateStats.addFields({ name: 'Time Played', value: `${segment.stats.timePlayed.displayValue}`, inline: true });
      } else if (!segment) {
        splitgateStats.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
      }
      return splitgateStats;
    }
  }
}