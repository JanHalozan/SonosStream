const youtubeApiKey = 'AIzaSyAGyDq2bPgXD2uvwfx_kCEAC-sE9jk-KJE';
var YouTube = require('youtube-node');
var youtube = new YouTube();

youtube.setKey(youtubeApiKey);

$('.search-button').click(function() {
   var needle = $('.search-field').val();

   youtube.search(needle, 10, function(error, result) {
      if (error) {
         alert(error);
         return;
      }

      var items = result.items;
      $(items).each(function(index, obj) {
         var videoId = obj.id.videoId;
         var title = obj.snippet.title;
         var item = '<li class="item" id="' + videoId + '">' + title + '</li>';
         $('.search-results').append(item);
      });
   });
});
