class Utils {
  renderPage(req, res, page, data = {}) {
    res.render(page, data);
  }
  discordImageURL(type, id, hash) {
    return `https://cdn.discordapp.com/${type}/${id}/${hash}`
  }
}
module.exports = new Utils;