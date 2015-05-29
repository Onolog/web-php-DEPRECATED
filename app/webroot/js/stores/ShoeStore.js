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

  var _item;
  var _initialItem;

  function _resetItem() {
    _item = {};
    _initialItem = {};
  }

  function _copy(obj) {
    return $.extend(true, {}, obj);
  }
  _resetItem();

  var ShoeStore = {
    /**
     * Check whether or not the shoe has been modified
     */
    getHasEdits: function() {
      return JSON.stringify(_item) !== JSON.stringify(_initialItem);
    },

    getData: function() {
      return _item;
    },

    setData: function(item) {
      _item = _copy(item);
      _initialItem = _copy(item);
    }
  };

  MicroEvent.mixin(ShoeStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
      case ActionTypes.SHOE_VIEW:
        _item = _copy(payload.data);
        _initialItem = _copy(payload.data);
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_UPDATE:
        var field = payload.field;
        var value = payload.value;

        _item[field] = value;
        if (value == null || ($.isArray(value) && !value.length)) {
          // Remove null values
          delete _item[field];
        }
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_ADD:
      case ActionTypes.SHOE_CANCEL:
      case ActionTypes.SHOE_EDIT:
      case ActionTypes.SHOE_DELETE:
        // Reset data when adding/deleting an item, or cancelling an action
        _resetItem();
        ShoeStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return ShoeStore;

});
