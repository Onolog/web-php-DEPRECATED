// @flow

/**
 * formatDistance.js
 *
 * Consistently formats distance measurements, by stripping trailing
 * zeroes and restricting floats to 2 decimal places.
 */
export default function formatDistance(distance: number | string): string {
  // We may get irrational values for floats, so restrict
  // to 2 decimal places.
  if (typeof distance === 'number') {
    distance = distance.toFixed(2);
  }

  // Trim trailing zeroes by converting to a number and then
  // converting back to a string.
  return (+distance).toString();
}
