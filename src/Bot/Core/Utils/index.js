class Utils {
  constructor() {
    this.embeds = require('./Responses/Embed');
    this.content = require('./Responses/Content');
    this.requestAPI = require('./requestAPI');
  }
}
module.exports = new Utils;