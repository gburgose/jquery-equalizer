(function($) {
  'use strict'
  $.fn.equalize = function(options) {
    var settings = $.extend({
    }, options);
    var debounce;
    var layout = function() {
      var biggest, biggestHeight, currentHeight, equalizeGroups, group, groupId, i, item, j, key, len, len1, results, toEqualize, usesInner;
      toEqualize = $('[data-equalize]');
      equalizeGroups = {};
      for (i = 0, len = toEqualize.length; i < len; i++) {
        item = toEqualize[i];
        $(item).addClass('equalize-load');
        groupId = $(item).data('equalize');
        if (!equalizeGroups[groupId]) {
          equalizeGroups[groupId] = [];
        }
        equalizeGroups[groupId].push(item);
      }
      results = [];
      for (key in equalizeGroups) {
        group = equalizeGroups[key];
        group = $(group);
        if (group.attr('data-equalize-inner')) {
          usesInner = true;
        } else {
          group.height('auto');
          usesInner = false;
        }
        biggest = [];
        biggestHeight = 0;
        for (j = 0, len1 = group.length; j < len1; j++) {
          item = group[j];
          if (usesInner) {
            currentHeight = $(item).children('.equalize-inner').height();
          } else {
            currentHeight = $(item).height();
          }
          if (currentHeight > biggestHeight) {
            biggest = $(item);
            biggestHeight = currentHeight;
          }
        }
        if (usesInner) {
          results.push(group.height($(biggest).children('.equalize-inner').height()));
        } else {
          results.push(group.height($(biggest).height()));
        }
      }
      return results;
    };
    console.log($('[data-equalize]').length);
    if ($('[data-equalize]').length > 0) {
      debounce = false;
      $(window).on('resize', function() {
        clearTimeout(debounce);
        debounce = setTimeout(layout, 250);
        return layout();
      }).resize();
      return $(window).one('load', function() {
        return layout();
      });
    }
  };
}(jQuery));