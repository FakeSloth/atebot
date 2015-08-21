var config = require('./config');

module.exports = {
  eval: function(target, user) {
    var name = user.name.toLowerCase();
    if (config.trustedUsers.indexOf(name) < 0) return;
    this.send('||>> ' + target);
    try {
      this.send('||<< ' + eval(target));
    } catch (e) {
      this.send('||<< error: ' + e.message);
      var stack = '||' + ('' + e.stack).replace(/\n/g, '\n||');
      this.send(stack);
    }
  },
  say: function(target, user) {
    this.send(target);
  }
};
