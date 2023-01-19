const request = require('request');

module.exports = class statifyAPI {
  constructor(APIKey) {
    // this.URL = 'https://statify.cc/api',
    this.URL = 'http://localhost:3001/api',
      this.headers = { "statify-api-key": APIKey }
  }
  POST_SUGGEST(suggestion, platform, interaction, webhookID) {
    request.post(`${this.URL}/suggest`, {
      headers: this.headers,
      json: { userID: interaction.user.id, serverID: interaction.guild.id, suggestion: suggestion, platform: platform, webhookID: webhookID }
    });
  }
  POST_CREATE_GUILD(guildID) {
    request.post(`${this.URL}/guild/create`, {
      headers: this.headers,
      json: { discordID: guildID }
    });
  }
  GET_GUILD(guildID) {
    return new Promise((resolve, reject) => {
      try {
        request.get({
          url: `${this.URL}/guild/get`,
          headers: this.headers,
          json: { discordID: guildID }
        }, (error, response, body) => {
          if (error)
            return reject(error);
          else resolve(body)
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
  INCREASE_CMD_COUNT(guildID) {
    request.post(`${this.URL}/guild/cmd`, {
      headers: this.headers,
      json: { discordID: guildID }
    });
  }
  DELETE_GUILD(guildID) {
    request.delete(`${this.URL}/guild/delete`, {
      headers: this.headers,
      json: { discordID: guildID }
    });
  }
}