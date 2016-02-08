var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var MicroEvent = require('lib/microevent');
var ShoeActions = require('flux/actions/ShoeActions');

var {contains, find, isArray, map} = require('lodash');

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
    if (!itemID) {
      return;
    }

    var item = find(_collection, {id: itemID});

    if (!item) {
      ShoeActions.view(itemID);
    }

    return item;
  },
};

MicroEvent.mixin(ShoeStore);

AppDispatcher.register(function(payload) {
  switch(payload.eventName) {

    case ActionTypes.ALL_SHOES_FETCH:
      _collection = payload.data;
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;
    case ActionTypes.ALL_SHOES_FETCH_ERROR:
      _collection = [];
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

    case ActionTypes.SHOE_VIEW:
      var shoe = payload.data;
      var shoeIds = map(_collection, 'id');
      if (!contains(shoeIds, shoe.id)) {
        _collection.push(shoe);
      }
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.SHOE_UPDATE:
      var itemID = payload.data.id;
      if (isArray(_collection)) {
        _collection = _collection.map(function(item) {
          return item.id === itemID ? payload.data : item;
        });
      }
      ShoeStore.trigger(ActionTypes.SHOE_UPDATE, payload.data);
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;
  }
  return true;
});

module.exports = ShoeStore;
