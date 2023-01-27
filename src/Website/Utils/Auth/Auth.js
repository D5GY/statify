const { Config } = require("../../../config");


module.exports = {
  isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  isStatifyStaff(req, res, next) {
    if (!this.isAuthenticated(req, res, next)) {
      return res.redirect('/login');
    } else if (!Config.STATIFY_DEVELOPERS_ID.includes(req.user.id)) {
      return res.redirect('/dashboard');
    } else return next();
  }
}