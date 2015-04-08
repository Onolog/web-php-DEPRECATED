/**
 * ResponseHandler.js
 *
 * Mirrors functionality in app/libs/response.php as well as handling
 * standard server responses.
 */
define(function() {

  var ResponseHandler = function(/*string*/ response) {
    // Parse the response if it hasn't been parsed already.
    this._response = typeof response === 'string' ?
      JSON.parse(response) : response;
  };

  ResponseHandler.prototype = {

    getWasSuccessful: function() /*bool*/ {
      if (typeof this._response.success === 'function') {
        return this._response.status === 200;
      } else {
        return this._response.success;
      }
    },

    getMessage: function() /*?string*/ {
      return (
        this._response.message ||
        this._getMessageFromStatus()
      );
    },

    getPayload: function() /*?any*/ {
      return this._response.payload;
    },

    getField: function(/*string*/ field) {
      return this._response[field];
    },

    _getMessageFromStatus: function() {
      switch(this._response.status) {
        case 200:
          return '';
        case 404:
        default:
          return 'Something went wrong. Please try again later.';
      }
    }
  };

  return ResponseHandler;

});
