var sonos = require('sonos');
var http = require('http');
var fs = require('fs');


const filePath = '/Users/janhalozan/Downloads/watermelonvodka.mp3';
var stat = fs.statSync(filePath);

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    // We replaced all the event handlers with a simple call to util.pump()
    fs.createReadStream(filePath).pipe(response);
})
.listen(2000);

$(document).ready(function() {
   devices = sonosSearch();
   setTimeout(function () {
      var playableDevices = getSonosPlayableDevices(devices);
      playableDevices.forEach(function(device) {
         $('#device-list').append('<li class="item">' + device.ip + '</li>');
      });
   }, SONOS_SEARCH_TIMEOUT);

   $(document).on('click', '#device-list .item', function(event) {
      var ip = event.target.innerHTML;
      var player = new sonos.Sonos(process.env.SONOS_HOST || ip);

      player.play('http://192.168.1.117:2000/track.mp3', function (err, playing) {
         console.log([err, playing])
      });
   });
});
