var gui = require('nw.gui');
var win = gui.Window.get();
var sonos = require('sonos');
var http = require('http');
var ip = require('ip');
var ytdl = require('ytdl-core');
var spawn = require('child_process').spawn;

const localIp = ip.address();

//TODO: Check for valid request
var server = http.createServer(function(req, response) {
   response.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': 1234556
   });

   var child = spawn('ffmpeg', ['-i', 'pipe:0', '-acodec', 'libmp3lame','-f', 'mp3', '-']);
   child.stdout.pipe(response);

   ytdl('https://www.youtube.com/watch?v=fj-10lIrboM', {filter: 'audioonly', quality: 'lowest'}).pipe(child.stdin);
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

   $(document).on('click', '.search-results .item', function(event) {
      //TODO: Implement me
   });

   $(document).on('click', '.devices .item', function(event) {
      var ip = event.target.innerHTML;
      var player = new sonos.Sonos(process.env.SONOS_HOST || ip);

      //TODO: Error hadling, nicer request - no track.mp3
      player.play('http://' + localIp + ':2000/track.mp3', function (err, playing) {
         console.log(err);
         console.log(playing);
      });
   });
});
