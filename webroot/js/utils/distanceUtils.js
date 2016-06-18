const METERS_PER_MILE = 1609.35;
const FEET_PER_METER = 3.28084;

/**
 * distanceUtils.js
 *
 * Convert distances, generally from metric to English
 *
 * TODO: miles to meters, miles to km, meters to km
 */
module.exports = {
  metersToMiles: function(/*number|string*/ distanceInMeters) /*number*/ {
    var miles = distanceInMeters / METERS_PER_MILE;

    // Round to 2 decimal places.
    // See: http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
    return +(Math.round(miles + 'e+2')  + 'e-2');
  },

  metersToFeet: function(/*number|string*/ distanceInMeters) /*number*/ {
    return +(Math.round(distanceInMeters * FEET_PER_METER));
  },
};
