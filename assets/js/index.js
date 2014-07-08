/**
* Main JS file for Casper behaviours
*/

/*globals jQuery, document */
(function ($) {
  "use strict";

  $(document).ready(function(){
    $(".post-content").fitVids();
    $('spoiler').each(function(index, el) {
      var tagSpoiler = $(el);
      var tagParent = tagSpoiler.parent();
      var tagView = $('<p><small>Spoiler Code</small></p>');

      tagParent.addClass('spoiler');
      tagView.prependTo(tagParent);
      tagView.bind('click', function() {
        tagSpoiler.css('display', tagSpoiler.css('display') === 'none' ? 'block' : 'none');
      });
    });
  });

}(jQuery));