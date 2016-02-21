var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var MicroEvent = require('lib/microevent');
var WorkoutActions = require('flux/actions/WorkoutActions');

var {find} = require('lodash');

var _collection = [];

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
    var item = find(_collection, (item) => item.id === itemId);

    if (!item) {
      WorkoutActions.view(itemId);
    }
    return item;
  },
};

MicroEvent.mixin(WorkoutStore);

AppDispatcher.register(({data, eventName}) => {
  switch(eventName) {
    case ActionTypes.WORKOUTS_FETCH:
      _collection = data;
      WorkoutStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.WORKOUT_ADD:
      _collection.push(data.activity);
      WorkoutStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.WORKOUT_DELETE:
      _collection = _collection.filter((item) => item.id !== data.id);
      WorkoutStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.WORKOUT_UPDATE:
    case ActionTypes.WORKOUT_VIEW:
      let {activity} = data;
      _collection = _collection.map((item) => {
        return item.id === activity.id ? activity : item;
      });
      WorkoutStore.trigger(ActionTypes.CHANGE);
      break;
  }
  return true;
});

module.exports = WorkoutStore;
