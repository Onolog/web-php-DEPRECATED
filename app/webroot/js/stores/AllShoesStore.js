/**
 * AllShoesStore
 *
 * Keeps track of all shoes loaded for a particular view.
 */

define([

  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',

  'constants/ActionTypes',
  'constants/Shoes',

  'utils/cakePHP',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  MicroEvent,

  ActionTypes,
  SHOES,

  cakePHP

) {

  var NEW_ID = SHOES.NEW_ID;
  var _shoes = [];
  var _cache = [];

  var AllShoesStore = {

    getShoes: function() {
      return _shoes;
    },

    getShoeByID: function(/*number*/ shoeID) {
      return _shoes.filter(function(shoe) {
        return +shoe.id === +shoeID
      })[0];
    },

    /**
     * Checks whether the shoe data has already been fetched from the
     * server and stored.
     */
    getIsCached: function(/*number*/ shoeID) /*bool*/ {
      return $.inArray(shoeID, _cache) !== -1;
    }
  };

  MicroEvent.mixin(AllShoesStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {

      case ActionTypes.ALL_SHOES_FETCH:
        _shoes = payload.data;
        AllShoesStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_ADD:
        _shoes.push(payload.data);
        AllShoesStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_DELETE:
        _shoes = _shoes.filter(function(shoe) {
          return shoe.id !== payload.shoeID;
        });
        AllShoesStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.SHOE_EDIT:
      case ActionTypes.SHOE_VIEW:
        var shoeID = payload.data.id;
        _shoes = _shoes.map(function(shoe) {
          return shoe.id === shoeID ? payload.data : shoe;
        });
        _cache.push(shoeID);
        AllShoesStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return AllShoesStore;

});
