/**
 * BrandsStore
 *
 * Stores the different brands of shoes
 */

define([

  'actions/BrandActions',
  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',
  'constants/ActionTypes',
  'lib/jquery/jquery.min'

], function(

  BrandActions,
  AppDispatcher,
  MicroEvent,
  ActionTypes

) {

  var _items;

  var BrandsStore = {
    getItems: function() {
      if (!_items) {
        BrandActions.fetch();
        return [];
      }

      return _items;
    },

    getItemByID: function(/*number*/ itemID) {
      return _items.filter(function(item) {
        return +item.id === +itemID
      })[0];
    }
  };

  MicroEvent.mixin(BrandsStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
      case ActionTypes.BRANDS_FETCH:
        _items = payload.data;
        BrandsStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return BrandsStore;

});
