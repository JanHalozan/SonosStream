var sonos = require('sonos');
var _ = require('underscore');
const SONOS_SEARCH_TIMEOUT = 5000;

function sonosSearch() {
   var devices = [];
   var params = {
      timeout: SONOS_SEARCH_TIMEOUT
   };

   sonos.search(params, function(device, model) {
      var data = {
         ip: device.host,
         port: device.port,
         model: model
      };

      device.getZoneAttrs(function(error, attributes) {
         if (!error) {
            _.extend(data, attributes);
         }
      });
      device.getZoneInfo(function(error, info) {
         if (!error) {
            _.extend(data, info);
         }

         device.getTopology(function(error, info) {
            if (error) {
               return;
            }

            info.zones.forEach(function(group) {
               if (group.location === 'http://' + data.ip + ':' + data.port + '/xml/device_description.xml') {
                 _.extend(data, group)
               }
            });

            devices.push(data);
         });
      });
   });

   return devices;
}

function getSonosPlayableDevices(deviceList) {
   var devices = [];

   deviceList.forEach(function(dev) {
      if (dev.CurrentZoneName !== 'BRIDGE') {
         devices.push(dev);
      }
   })

   return devices;
}
