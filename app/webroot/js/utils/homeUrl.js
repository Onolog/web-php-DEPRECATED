var pad = require('./pad');

/**
 * homeUrl
 *
 * Simple util function for defining the default home url.
 */
function homeUrl() {
  var now = new Date();
  return '/' + now.getFullYear() + '/' + pad(now.getMonth() + 1, 2);
}

module.exports = homeUrl;
