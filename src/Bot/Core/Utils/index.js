class Utils {
  constructor() {
    this.embeds = require('./Responses/Embed');
    this.content = require('./Responses/Content');
    this.requestAPI = require('./requestAPI');
    this.statifyAPI = require('./statifyAPI');
    this.Functions = require('./Functions');
  }
}
module.exports = new Utils;