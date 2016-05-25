import {find} from 'lodash';

import AppDispatcher from 'flux/AppDispatcher';
import MicroEvent from 'lib/microevent';

import {
  CHANGE,
  WORKOUT_ADD,
  WORKOUT_DELETE,
  WORKOUT_UPDATE,
  WORKOUT_VIEW,
  WORKOUTS_FETCH,
} from 'flux/ActionTypes';

let _collection = window.APP_DATA.workouts || [];

/**
 * WorkoutStore
 *
 * Keeps track of all workouts loaded for a particular view.
 */
const WorkoutStore = {
  getAll() {
    return _collection;
  },

  getSingle(/*number*/ itemId) {
    return find(_collection, {id: itemId});
  },
};

MicroEvent.mixin(WorkoutStore);

AppDispatcher.register(({data, eventName}) => {
  switch(eventName) {
    case WORKOUTS_FETCH:
      _collection = data;
      WorkoutStore.trigger(CHANGE);
      break;

    case WORKOUT_ADD:
      _collection.push(data.activity);
      WorkoutStore.trigger(CHANGE);
      break;

    case WORKOUT_DELETE:
      _collection = _collection.filter((item) => item.id !== data.id);
      WorkoutStore.trigger(CHANGE);
      break;

    case WORKOUT_UPDATE:
    case WORKOUT_VIEW:
      let {activity} = data;
      _collection = _collection.filter((item) => +item.id !== +activity.id);
      _collection.push(activity);
      WorkoutStore.trigger(CHANGE);
      break;
  }
  return true;
});

module.exports = WorkoutStore;
