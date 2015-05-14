/**
 * ShoeStore.js
 *
 * Keeps track of data for a single shoe. Used when adding, deleting, editing,
 * or viewing a particular shoe.
 */

define([

  'constants/ActionTypes',
  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',
  'lib/jquery/jquery.min'

], function(

  ActionTypes,
  AppDispatcher,
  MicroEvent

) {

  var _data;
  var _initialData;

  function _resetData() {
    _data = {};
    _initialData = {};
  }

  function _copy(obj) {
    return $.extend(true, {}, obj);
  }
  _resetData();

  var ShoeStore = {
    /**
     * Check whether or not the shoe has been modified
     */
    getHasEdits: function() {
      return JSON.stringify(_data) !== JSON.stringify(_initialData);
    },

    getData: function() {
      return _data;
    },

    setData: function(data) {
      _data = _copy(data);
      _initialData = _copy(data);
    }
  };

  MicroEvent.mixin(ShoeStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
      case ActionTypes.SHOE_VIEW:
        _data = _copy(payload.data);
        _initialData = _copy(payload.data);
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_UPDATE:
        var field = payload.field;
        var value = payload.value;

        _data[field] = value;
        if (!value || ($.isArray(value) && !value.length)) {
          // Remove null values
          delete _data[field];
        }
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_ADD:
      case ActionTypes.SHOE_CANCEL:
      case ActionTypes.SHOE_EDIT:
      case ActionTypes.SHOE_DELETE:
        // Reset data when adding/deleting an item, or cancelling an action
        _resetData();
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return ShoeStore;

});
