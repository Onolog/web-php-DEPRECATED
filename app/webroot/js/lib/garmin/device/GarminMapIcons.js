/**
 * Icons used to mark waypoints and POIs on Google maps.  
 * 
 * @class Garmin.MapIcons
 * @constructor 
 */
define(['gmaps'], function() {

  Garmin.MapIcons = function() {};
  Garmin.MapIcons = {
    getRedIcon: function() {
      var url = 'http://developer.garmin.com/img/marker_red.png';
      var title = 'Finish';
      return Garmin.MapIcons._getIcon(url, title);
    },
    
    getGreenIcon: function() {
      var url = 'http://developer.garmin.com/img/marker_green.png';
      var title = 'Start';
      return Garmin.MapIcons._getIcon(url, title);
    },

    _getIcon: function(url, title) {
      return {
        url: url,
        title: title,
        size: new google.maps.Size(12, 20),
        origin: new google.maps.Point(5, 1),
        anchor: new google.maps.Point(6, 20)
      };
    }
  }

  return Garmin.MapIcons;

});