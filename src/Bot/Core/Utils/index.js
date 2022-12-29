class Utils {
  constructor() {
    this.embeds = require('./Responses/Embed');
    this.content = require('./Responses/Content');
    this.requestAPI = require('./requestAPI');
    this.statifyAPI = require('./statifyAPI');
  }
}
module.exports = new Utils;