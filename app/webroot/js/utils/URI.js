/**
 * URI.js
 *
 * Lib for creating and manipulating URIs
 */

define(['lib/jquery/jquery.min'], function() {

  var URI = function URI(/*?string*/ uri) {
    // Init the uri and params.
    this.setURI(uri);
    this.setQueryParams({});
  };

  URI.prototype = {

    getDomain: function() {
      return this._domain;    
    },

    getSubDomain: function() {
      return this._subDomain;    
    },

    getProtocol: function() {
      return this._protocol;
    },

    /**
     * Reconstruct the URI from separate pieces
     */
    constructURI: function() {
      return (
        this._protocol +
        this._subDomain || this._domain +
        this. 
      );
    },

    getURI: function() {
      return this._uri;
    },

    /**
     * Split the URI into discrete pieces
     */
    parseURI: function(/*string*/ uri) /*object*/ {
      return {
        domain: '',
        uri: uri,
        protocol: '',
        subDomain: ''
      };
    },

    setURI: function(/*string*/ uri) {
      var uriObj = this.parseURI(uri);
      this._uri = uriObj.uri;
    },

    /**
     * Add new params to existing ones
     */
    addQueryParams: function(/*object*/ params) {
      $.extend(this._params, params);
    },

    /**
     * Replace existing params
     */
    setQueryParams: function(/*object*/ params) {
      this._params = params;
    },

    toString: function() {
      var uri = this.constructURI();
      if (this._params) {
        return uri + '?' + $.param(this._params);
      }
      return uri;
    }
  }

  return URI;

});