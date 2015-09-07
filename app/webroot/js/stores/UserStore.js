define([

  'actions/UserActions',
  'constants/ActionTypes',
  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',
  'utils/homeUrl',
  'lib/underscore/underscore'

], function(

  UserActions,
  ActionTypes,
  AppDispatcher,
  MicroEvent,
  homeUrl

) {

  var _user;

  /**
   * UserStore
   *
   * Keeps track of the user's info and login state.
   */
  var UserStore = {
    getUser: function() {
      if (!_user) {
        UserActions.getSession();
      }
      return _user;
    }
  };

  MicroEvent.mixin(UserStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
      case ActionTypes.USER_LOGIN:
        // TODO: Figure out why this action doesn't get heard.
        break;
      case ActionTypes.USER_SESSION:
        _user = payload.data || {};
        break;
      case ActionTypes.USER_LOGOUT:
        _user = null;
        break;
    }
    UserStore.trigger(ActionTypes.CHANGE);
    return true;
  });

  return UserStore;

});
