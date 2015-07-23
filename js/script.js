var gui = require('nw.gui');
var win = gui.Window.get();
var sonos = require('sonos');
var http = require('http');
var fs = require('fs');
var ip = require('ip');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

const localIP = ip.address();

const filePath = '/Users/janhalozan/Downloads/Zablujena\ Generacija/komad.mp3';
var stat = fs.statSync(filePath);

var server = http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'audio/mpeg'
    });

    // We replaced all the event handlers with a simple call to util.pump()
   //  fs.createReadStream(filePath).pipe(response);

   var url = 'https://www.youtube.com/watch?v=5qF_qbaWt3Q';
   var video = ytdl(url, {filter: 'audioonly'});

   new ffmpeg({source: video}).writeToStream(response, function(data, err) {
         if (err)
            alert(err);
            //console.log("err");
         });
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
      $('#device-list').empty();

      var playableDevices = getSonosPlayableDevices(devices);
      playableDevices.forEach(function(device) {
         $('#device-list').append('<li class="item">' + device.ip + '</li>');
      });
   }, SONOS_SEARCH_TIMEOUT);

   $(document).on('click', '#device-list .item', function(event) {
      var ip = event.target.innerHTML;
      var player = new sonos.Sonos(process.env.SONOS_HOST || ip);
      
      player.play('http://' + localIP + ':2000/track.mp3', function (err, playing) {
         console.log(err);
         console.log(playing);
      });
   });
});
