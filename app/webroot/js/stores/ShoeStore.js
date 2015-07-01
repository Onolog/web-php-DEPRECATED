define([

  'actions/ShoeActions',
  'constants/ActionTypes',
  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',
  'lib/underscore/underscore'

], function(

  ShoeActions,
  ActionTypes,
  AppDispatcher,
  MicroEvent

) {

  var _collection;

  /**
   * ShoeStore
   */
  var ShoeStore = {

    getCollection: function() {
      if (!_collection) {
        ShoeActions.fetch();
        return [];
      }
      return _collection;
    },

    getItem: function(/*number*/ itemID) {
      var item = _.find(_collection, function(item) {
        return item.id === itemID;
      });

      if (!item) {
        ShoeActions.view(itemID);
      }
      return item;
    }
  };

  MicroEvent.mixin(ShoeStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {

      case ActionTypes.ALL_SHOES_FETCH:
        _collection = payload.data;
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_ADD:
        _collection.push(payload.data);
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_DELETE:
        _collection = _collection.filter(function(item) {
          return item.id !== payload.data;
        });
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_UPDATE:
      case ActionTypes.SHOE_VIEW:
        var itemID = payload.data.id;
        _collection = _collection.map(function(item) {
          return item.id === itemID ? payload.data : item;
        });
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return ShoeStore;

});
