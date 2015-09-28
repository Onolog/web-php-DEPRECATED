var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MicroEvent = require('../lib/MicroEvent/microevent');
var BrandActions = require('../actions/BrandActions');

var _items;

/**
 * BrandStore
 *
 * Stores the different brands of shoes
 */
var BrandStore = {
  getCollection: function() {
    if (!_items) {
      BrandActions.fetch();
      return [];
    }

    return _items;
  },

  getItem: function(/*number*/ itemID) {
    return _items.filter(function(item) {
      return +item.id === +itemID
    })[0];
  }
};

MicroEvent.mixin(BrandStore);

AppDispatcher.register(function(payload) {
  switch(payload.eventName) {
    case ActionTypes.BRANDS_FETCH:
      _items = payload.data;
      BrandStore.trigger(ActionTypes.CHANGE);
      break;
  }
  return true;
});

module.exports = BrandStore;
