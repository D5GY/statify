class Utils {
  renderPage(req, res, page, data = {}) {
    res.render(page, data);
  }
}
module.exports = new Utils;