const request = require('request');
module.exports = class requestAPI {
  constructor(API) {
    this.CLASH_OF_CLANS = {
      URL: 'https://api.clashofclans.com/v1/players',
      HEADER: { authorization: `Bearer ${API.CLASH_OF_CLANS}` }
    }
    this.TRACKER_GG = {
      HEADER: { 'TRN-Api-Key': API.TRACKER_GG, 'content-type': 'application/json' },
      ApexURL: 'https://public-api.tracker.gg/v2/apex/standard/profile',
      CSGOURL: 'https://public-api.tracker.gg/v2/csgo/standard/profile',
      Division2URL: 'https://public-api.tracker.gg/v2/division-2/standard/profile',
      SplitgateURL: 'https://public-api.tracker.gg/v2/splitgate/standard/profile'
    }
    this.MinecraftURL = 'https://eu.mc-api.net/v3/server/ping';
    this.BRAWL_STARS = {
      URL: 'https://api.brawlstars.com/v1/players',
      HEADER: { authorization: `Bearer ${API.BRAWL_STARS}` }
    }
  }
  async ClashOfClans(username) {
    return new Promise((resolve, reject) => {
      try {
        request.get({
          url: `${this.CLASH_OF_CLANS.URL}/${encodeURIComponent(username)}`,
          headers: this.CLASH_OF_CLANS.HEADER
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
  async ApexLegends(username, platform) {
    return new Promise((resolve, reject) => {
      try {
        request.get({
          url: `${this.TRACKER_GG.ApexURL}/${platform}/${encodeURIComponent(username)}`,
          headers: this.TRACKER_GG.HEADER
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
  async CSGO(username) {
    return new Promise((resolve, reject) => {
      try {
        request.get({
          url: `${this.TRACKER_GG.CSGOURL}/steam/${encodeURIComponent(username)}`,
          headers: this.TRACKER_GG.HEADER
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
  async Division2(username, platform) {
    return new Promise((resolve, reject) => {
      try {
        request.get({
          url: `${this.TRACKER_GG.Division2URL}/${platform}/${encodeURIComponent(username)}`,
          headers: this.TRACKER_GG.HEADER
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
  async Splitgate(username, platform) {
    return new Promise((resolve, reject) => {
      try {
        request.get({
          url: `${this.TRACKER_GG.SplitgateURL}/${platform}/${encodeURIComponent(username)}`,
          headers: this.TRACKER_GG.HEADER
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
  async Minecraft(ip) {
    return new Promise((resolve, reject) => {
      try {
        request.get({
          url: `${this.MinecraftURL}/${encodeURIComponent(ip)}`
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
  async BrawlStars(username) {
    return new Promise((resolve, reject) => {
      try {
        request.get({
          url: `${this.BRAWL_STARS.URL}/${encodeURIComponent(username)}`,
          headers: this.BRAWL_STARS.HEADER
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
}