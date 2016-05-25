var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var MicroEvent = require('lib/microevent');

var {find, isArray, map} = require('lodash');

var _collection = window.APP_DATA.shoes || [];

/**
 * ShoeStore
 */
var ShoeStore = {
  getAll() {
    return _collection;
  },

  getSingle(/*number*/ itemId) {
    return find(_collection, {id: itemId});
  },
};

MicroEvent.mixin(ShoeStore);

AppDispatcher.register(({data, eventName}) => {
  switch(eventName) {
    case ActionTypes.ALL_SHOES_FETCH:
      _collection = data;
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;
    case ActionTypes.ALL_SHOES_FETCH_ERROR:
      _collection = [];
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.SHOE_ADD:
      _collection.push(data);
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.SHOE_DELETE:
      _collection = _collection.filter((item) => item.id !== data);
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.SHOE_VIEW:
      var shoeIds = map(_collection, 'id');
      if (shoeIds.indexOf(data.id) === -1) {
        _collection.push(data);
      }
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.SHOE_UPDATE:
      var itemId = data.id;
      if (isArray(_collection)) {
        _collection = _collection.map((item) => {
          return item.id === itemId ? data : item;
        });
      }
      ShoeStore.trigger(ActionTypes.SHOE_UPDATE, data);
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;
    case ActionTypes.WORKOUT_ADD:
    case ActionTypes.WORKOUT_DELETE:
    case ActionTypes.WORKOUT_UPDATE:
      // When activities are added, removed, or updated, this may affect the
      // mileage for the shoe associated with that activity. Update the store
      // with the new data.
      if (data && data.shoes) {
        _collection = data.shoes;
      }
      break;
  }
  return true;
});

module.exports = ShoeStore;
