/**
 * Serializes an object into a URI-encoded query string.
 */
module.exports = function(/*object*/ obj) {
  return Object.keys(obj).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
  }).join('&');
};
