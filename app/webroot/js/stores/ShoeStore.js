var _ = require('underscore');

var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MicroEvent = require('../lib/MicroEvent/microevent');
var ShoeActions = require('../actions/ShoeActions');

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

    var item = _.find(_collection, function(item) {
      return item.id === +itemID;
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
      if (_.isArray(_collection)) {
        _collection = _collection.map(function(item) {
          return item.id === itemID ? payload.data : item;
        });
      }
      ShoeStore.trigger(ActionTypes.CHANGE);
      break;
  }
  return true;
});

module.exports = ShoeStore;
