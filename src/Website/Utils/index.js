const { Logger } = require("../../Logger");

class Utils {
  renderPage(req, res, page, data = {}) {
    res.render(page, data);
    if (!data) {
      Logger.RED('website', 'Data could not be found.')
    }
  }
  discordImageURL(type, id, hash) {
    return `https://cdn.discordapp.com/${type}/${id}/${hash}`
  }
}
module.exports = new Utils;