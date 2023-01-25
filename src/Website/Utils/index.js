const { Logger } = require("../../Logger");

class Utils {
  renderPage(req, res, page, data = {}) {
    res.render(page, data);
    if (!data) {
      Logger.RED('website', 'Data could not be found.')
    }
  }
}
module.exports = new Utils;