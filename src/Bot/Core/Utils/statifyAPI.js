const request = require('request');

module.exports = class statifyAPI {
  constructor(APIKey) {
    this.URL = 'https://statify.cc/api',
      this.headers = { "statify-api-key": APIKey }
  }
  POST_SUGGEST(suggestion, platform, interaction, webhookID) {
    request.post(`${this.URL}/suggest`, {
      headers: this.headers,
      json: { userID: interaction.user.id, serverID: interaction.guild.id, suggestion: suggestion, platform: platform, webhookID: webhookID }
    });
  }
}