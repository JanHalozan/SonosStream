var gui = require('nw.gui');
var win = gui.Window.get();
var sonos = require('sonos');
var http = require('http');
var fs = require('fs');
var ip = require('ip');
var ytdl = require('ytdl-core');
// var ytdl = require('youtube-dl');
// var ffmpeg = require('fluent-ffmpeg');
// var ffmpeg = require('ffmpeg');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var request = require('request');

const localIP = ip.address();

const filePath = '/Users/janhalozan/Downloads/Zablujena\ Generacija/komad.mp3';
// var stat = fs.statSync(filePath);

var server = http.createServer(function(req, response) {


   response.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': 1234556
   });

   var child = spawn('ffmpeg', ['-i', 'pipe:0', '-acodec', 'libmp3lame','-f', 'mp3', '-']);
   child.stdout.pipe(response);

   ytdl('http://www.youtube.com/watch?v=5qF_qbaWt3Q', {filter: 'audioonly', quality: 'lowest'}).pipe(child.stdin);
});

server.listen(2000);

win.on('close', function(){
   this.hide();
   server.close();
   this.close(true);
});

$(document).ready(function() {
   devices = sonosSearch();

   setTimeout(function () {
      $('.devices').empty();

      var playableDevices = getSonosPlayableDevices(devices);
      playableDevices.forEach(function(device) {
         $('.devices').append('<li class="item">' + device.ip + '</li>');
      });
   }, SONOS_SEARCH_TIMEOUT);

   $(document).on('click', '.devices .item', function(event) {
      var ip = event.target.innerHTML;
      var player = new sonos.Sonos(process.env.SONOS_HOST || ip);

      player.play('http://' + localIP + ':2000/track.mp3', function (err, playing) {
         console.log(err);
         console.log(playing);
      });
   });
});
