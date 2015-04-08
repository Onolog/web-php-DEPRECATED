/**
 * StoreMixin.react
 * @jsx React.DOM
 *
 * Abstracts a bunch of boilerplate associated with adding stores to components.
 * To use, set `this.stores` in `componentWillMount`.
 */
define([

  'lib/react/react',
  'constants/ActionTypes'

], function(React, ActionTypes) {

  return {
    /**
     * The actionType param is optional, in case we want to fire the callback
     * on something other than 'change'.
     */
    setStoreInfo: function(
      /*object*/ store,
      /*function*/ callback,
      /*?string*/ actionType
    ) /*object*/ {
      return {
        actionType: actionType,
        callback: callback,
        store: store
      };
    },

    componentDidMount: function() {
      var actionType;
      this.stores.forEach(function(storeInfo) {
        actionType = storeInfo.actionType || ActionTypes.CHANGE;
        storeInfo.store.bind(actionType, storeInfo.callback);
      });
    },

    componentWillUnmount: function() {
      var actionType;
      this.stores.forEach(function(storeInfo) {
        actionType = storeInfo.actionType || ActionTypes.CHANGE;
        storeInfo.store.unbind(ActionTypes.CHANGE, storeInfo.callback);
      });
    }
  };

});
