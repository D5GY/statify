const statify = require('../../statify');
module.exports = {
  /**
   * 
   * @param { string } action 
   * @param { statify } statify 
   * @returns string
   */
  DEFAULT_ERROR: (action, statify) => `${statify.Emojis.ICON_RED} An unexpected error occurred within a ${action}, We will look into this!`,
  MODAL_SUBMITTED: (action, statify) => `${statify.Emojis.ICON_GREEN} ${action} submitted`,
  HELP_COMMAND: `If you would like to see all of our commands/features you can do so by visiting our website: [statify.cc/commands](https://statify.cc/commands)`
}