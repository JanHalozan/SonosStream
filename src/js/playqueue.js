var playQueue = {
   trackAddedListeners: [],
   trackRemovedListeners: [],
   queue: [],
   enqueueTrack: function(track) {
      this.queue.push(track);

      this.trackAddedListeners.forEach(function(callback) {
         callback(track);
      });
   },
   dequeueTrack: function() {
      var track = this.queue.shift();

      this.trackRemovedListeners.forEach(function(callback) {
         callback(track);
      });

      return track;
   },
   removeTrackAtIndex: function(index) {
      this.queue.splice(index, 1);

      this.trackRemovedListeners.forEach(function(callback) {
         callback();
      });
   }
};

playQueue.trackAddedListeners.push(function(track) {
   $('.queued-tracks-list').append('<li id="' + track.id + '">' + track.title + ' </li>');
});
