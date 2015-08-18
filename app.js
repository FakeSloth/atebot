var Spinner = require('cli-spinner').Spinner;
var chalk = require('chalk');
var io = require('socket.io-client');

var config = require('./config');
var handler = require('./handler');

var socket = io(config.url);

var spinner = spin("Connecting...");

socket.on('connect', handler.connect.bind(socket, spinner));
socket.on('disconnect', handler.disconnect);
socket.on('e', handler.event);

function spin(msg) {
  var spinner = new Spinner("%s " + chalk.yellow(msg));
  spinner.setSpinnerString('|/-\\');
  spinner.start();
  return spinner;
}
