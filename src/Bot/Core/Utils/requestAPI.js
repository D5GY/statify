const request = require('request');
module.exports = class requestAPI {
  constructor(API) {
    this.CLASH_OF_CLANS = {
      URL: 'https://api.clashofclans.com/v1/players',
      HEADER: { authorization: `Bearer ${API.CLASH_OF_CLANS}` }
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
}