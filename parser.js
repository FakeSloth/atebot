const VALID_COMMAND_TOKENS = ['.', 'booty'];

module.exports = {
  /**
   * Parses a chat event.
   *
   * @param {String} data
   * @returns {Object}
   */
  parseChatEvent: function(data) {
    var array = data.split('|').slice(1);
    
    if (array.length === 2) {
      return {
        name: array[0].trim(),
        msg: array[1].trim(),
        ctx: 'c'
      };
    } else {
      return {
        name: array[0].trim(),
        msg: array[2].trim(),
        ctx: 'pm'
      };
    }
  },

  /**
   * Parse command in a message.
   *
   * @param {String} message
   * @returns {Object}
   */
  parseCommand: function(message) {
    if (!message || !message.trim().length) return;

    var cmd = '';
    var target = '';
    var args = message.split(' ');

    VALID_COMMAND_TOKENS.forEach(function(token) {
      if (token.length !== 1) {
        if (args[0] !== token) return;
        cmd = args[1] ? args[1].trim().toLowerCase() : '';
        target = args.slice(2).length ? args.slice(2).join(' ') : '';
      } else {
        if (args[0].charAt(0) !== token) return;
        var spaceIndex = message.indexOf(' ');
        cmd = message.substr(1, spaceIndex - 1).toLowerCase();
        target = message.substr(spaceIndex + 1);
      }
    });

    if (!cmd) return;

    return { cmd: cmd, target: target  };
  }
};
