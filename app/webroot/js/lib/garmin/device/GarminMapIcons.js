/**
 * Icons used to mark waypoints and POIs on Google maps.  
 * 
 * @class Garmin.MapIcons
 * @constructor 
 */
define(['gmaps'], function() {

  var BASE_URL =
    'https://static.garmincdn.com/com.garmin.connect/ui/images/maps/';

  return {
    getGreenIcon: function() {
      return this._getIcon(
        'pin-player-start.png',
        'Start'
      );
    },

    getRedIcon: function() {
      return this._getIcon(
        'pin-player-end.png',
        'Finish'
      );
    },

    _getIcon: function(filename, title) {
      return {
        url: BASE_URL + filename,
        title: title,
        size: new google.maps.Size(33, 50),
        origin: new google.maps.Point(5, 1),
        anchor: new google.maps.Point(6, 20)
      };
    }
  };

});