module.exports = class Functions {
  isSteamID(username) {
    return new RegExp(/^\d+\.?\d*$/).test(username);
  }
}