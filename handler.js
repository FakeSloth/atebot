var chalk = require('chalk');
var log = console.log;

var commands = require('./commands');
var config = require('./config');
var context = require('./context');
var parser = require('./parser');

module.exports = {
  connect: function(spinner) {
    spinner.stop();
    log("\n" + chalk.green("Connected!") + " Websocket at " + chalk.bold(config.url));
    this.emit('e', {"msg":"/join lobby", "event":"c"});
    this.emit('e', {"username":config.username,"event":"nametaken"});
  },

  disconnect: function() {
    log(chalk.red("Disconnected!"));
  },

  event: function(data) {
    data = data.split('\n');

    var _this = this;
    data.forEach(function (line) {
      if ('cp'.indexOf(line.charAt(0)) < 0) return;
      var chat = parser.parseChatEvent(line);
      var cmder = parser.parseCommand(chat.msg);
      var user = {name: chat.name};
      var ctx = context(_this, user.name);

      log(chat);
      if (!cmder || data.length > 1) return;
      log(chalk.inverse(JSON.stringify(cmder)));
      if (commands[cmder.cmd]) {
        commands[cmder.cmd].call(ctx[chat.ctx], cmder.target, user);
      }
    });
  }
};
