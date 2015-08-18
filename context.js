module.exports = function(socket, user) {
  return {
    c: {
      send: function(target) {
        socket.emit('e', {msg: target, room: 'lobby', event: 'c'});
      }
    },

    pm: {
      send: function(target) {
        socket.emit('e', {msg: "/pm " + user + "," + target, room: 'lobby', event: 'c'});
      }
    }
  };
};
