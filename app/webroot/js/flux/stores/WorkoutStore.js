var _ = require('underscore');
var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var MicroEvent = require('lib/microevent');

var _collection = [];
var _cache = [];

/**
 * WorkoutStore
 *
 * Keeps track of all workouts loaded for a particular view.
 *
 * NOTE: We're currently loading the workouts into the store from the view.
 * It may be better to do this from the store directly.
 */
var WorkoutStore = {

  getCollection: function() {
    return _collection;
  },

  getItem: function(/*number*/ itemId) {
    var item = _.find(_collection, function(item) {
      return item.id === itemId;
    });

    if (!item) {
      WorkoutActions.view(itemID);
    }
    return item;
  },

  /**
   * Checks whether all the workout data has already been fetched from the
   * server and stored.
   */
  getIsCached: function(/*number*/ itemId) /*bool*/ {
    return _.indexOf(_cache, itemId) !== -1;
  }
};

MicroEvent.mixin(WorkoutStore);

AppDispatcher.register(function(payload) {
  switch(payload.eventName) {
    case ActionTypes.WORKOUTS_FETCH:
      _collection = payload.data;
      WorkoutStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.WORKOUT_ADD:
      _collection.push(payload.data);
      WorkoutStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.WORKOUT_DELETE:
      _collection = _collection.filter(function(item) {
        return item.id !== payload.data;
      });
      WorkoutStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.WORKOUT_UPDATE:
    case ActionTypes.WORKOUT_VIEW:
      var itemId = payload.data.id;
      _collection = _collection.map(function(item) {
        return item.id === itemId ? payload.data : item;
      });
      _cache.push(itemId);
      WorkoutStore.trigger(ActionTypes.CHANGE);
      break;
  }
  return true;
});

module.exports = WorkoutStore;
