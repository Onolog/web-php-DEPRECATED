// @flow

const METERS_PER_MILE = 1609.35;
const FEET_PER_METER = 3.28084;

/**
 * distanceUtils.js
 *
 * Convert distances, generally from metric to English
 *
 * TODO: miles to meters, miles to km, meters to km
 */

export function metersToMiles(
  distanceInMeters: number,
  precision: number = 2
): number {
  const miles = distanceInMeters / METERS_PER_MILE;

  // Round to x decimal places.
  // See:
  //  - https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
  //  - https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding/32605063#32605063
  return +(Math.round(+(miles + 'e' + precision)) + 'e' + -precision);
}

export function metersToFeet(distanceInMeters: number): number {
  return +(Math.round(distanceInMeters * FEET_PER_METER));
}
