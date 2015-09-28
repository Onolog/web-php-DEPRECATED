var GARMIN = require('../constants/Garmin');

/**
 * GarminDeviceUtils
 *
 * Util functions for getting certain device-related values
 */
var GarminDeviceUtils = {
  /**
   * Converts the full Garmin device name to an image URL
   */
  getDeviceImageSrc: function(/*string*/ deviceName) /*number*/ {
    // Convert from something like: 'Garmin Forerunner 910XT'
    // to: 'forerunner-910xt'
    var model = deviceName
      .toLowerCase()
      .replace('garmin ', '')
      .split(' ')
      .join('-');

    return GARMIN.BASE_IMG_URL + model + '.png';
  },

  /**
   * Returns the product page URL on Garmin.com for the given product.
   *
   * TODO: Get this working
   */
  getDeviceProductPageURL: function() {
    return '#';

    var info = this._getDeviceInfo();
    if (!info) {
      return '';
    }

    var productID = GARMIN.PRODUCT_ID[info.series][info.model];
    return GARMIN.BASE_STORE_URL + '?' + $.param({pID: productID});
  }
};

module.exports = GarminDeviceUtils;
