var exec = require('child_process').exec;
var path = require('path');
var EventEmitter = require('events').EventEmitter;

var cmd = path.join(__dirname, '..', 'bin', 'idle.exe');

var Idle = function(seconds) {
  var self = this;
  this.isIdle = false;
  this.seconds = seconds;
  this.emitter = new EventEmitter();

  setInterval(function() {
    exec(cmd, function(err, stdout) {
      if(err) { return console.error(err); }
      var seconds = parseInt(stdout) / 1000;

      if(self.isIdle === false && seconds > self.seconds) {
        self.isIdle = true;
        self.emitter.emit('idle');
      }

      if(self.isIdle === true && seconds < self.seconds) {
        self.isIdle = false;
        self.emitter.emit('active');
      }

    });

  }, 1000);
};

Idle.prototype.on = function(event, callback) {
  this.emitter.on(event, callback);
};

module.exports = Idle;
