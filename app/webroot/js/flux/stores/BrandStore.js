var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var BrandActions = require('flux/actions/BrandActions');
var MicroEvent = require('lib/microevent');

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
