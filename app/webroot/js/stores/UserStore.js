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

  var _authToken;
  var _isLoggedIn;
  var _user = {};

  /**
   * UserStore
   *
   * Keeps track of the user's info and login state.
   */
  var UserStore = {

    getUser: function() {
      if (_isLoggedIn && _.isEmpty(_user)) {
        UserActions.getUser();
      }
      return _user;
    },

    getIsLoggedIn: function() {
      if (_isLoggedIn != null) {
        return _isLoggedIn;
      }
      UserActions.getLoginStatus();
    }
  };

  MicroEvent.mixin(UserStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
      case ActionTypes.USER_LOGIN:
        debugger;
        break;
      case ActionTypes.USER_STATUS:
        _isLoggedIn = payload.data.status === 'connected';
        break;
      case ActionTypes.USER_FETCH:
        _user = payload.data;
        break;
      case ActionTypes.USER_LOGOUT:
        _authToken = null;
        _isLoggedIn = null;
        _user = {};
        break;
    }
    UserStore.trigger(ActionTypes.CHANGE);
    return true;
  });

  return UserStore;

});
