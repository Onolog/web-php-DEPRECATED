/**
 * formatDistance.js
 *
 * Consistently formats distance measurements, by stripping trailing
 * zeroes and restricting floats to 2 decimal places.
 */
function formatDistance(/*string|number*/ distance) /*string*/ {
  // We may get irrational values for floats, so restrict
  // to 2 decimal places.
  if (typeof distance === 'number') {
    distance = distance.toFixed(2);
  }

  // Trim trailing zeroes by converting to a number and then
  // converting back to a string.
  return (distance * 1).toString();
}

module.exports = formatDistance;
