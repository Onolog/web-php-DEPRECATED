/**
 * isInt.js
 *
 * Util function for checking whether a variable is an int (as opposed to
 * simply a number).
 */
function isInt(val) {
  return (
    typeof val === 'number' &&
    isFinite(val) &&
    val > -9007199254740992 &&
    val < 9007199254740992 &&
    Math.floor(val) === val
  );
}

module.exports = isInt;
