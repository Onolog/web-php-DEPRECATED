/**
 * AllShoesStore
 *
 * Keeps track of all shoes loaded for a particular view.
 */
define([

  'actions/ShoeActions',
  'constants/ActionTypes',
  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',
  'lib/jquery/jquery.min'

], function(

  ShoeActions,
  ActionTypes,
  AppDispatcher,
  MicroEvent

) {

  var _collection = [];
  var _cache = [];

  var AllShoesStore = {

    getCollection: function() {
      return _collection;
    },

    getItem: function(/*number*/ itemID) {
      // Return the item if we already have it
      if (this.getIsCached(itemID)) {
        return _collection.filter(function(item) {
          return item.id === itemID
        })[0];
      }

      // Otherwise fetch it
      ShoeActions.view(itemID);
      return false;
    },

    /**
     * Checks whether the shoe data has already been fetched from the
     * server and stored.
     */
    getIsCached: function(/*number*/ itemID) /*bool*/ {
      return $.inArray(itemID, _cache) !== -1;
    }
  };

  MicroEvent.mixin(AllShoesStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {

      case ActionTypes.ALL_SHOES_FETCH:
        _collection = payload.data;
        AllShoesStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_ADD:
        _collection.push(payload.data);
        AllShoesStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_DELETE:
        _collection = _collection.filter(function(item) {
          return item.id !== payload.data;
        });
        AllShoesStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_EDIT:
      case ActionTypes.SHOE_VIEW:
        var itemID = payload.data.id;
        _collection = _collection.map(function(item) {
          return item.id === itemID ? payload.data : item;
        });
        _cache.push(itemID);
        AllShoesStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return AllShoesStore;

});
