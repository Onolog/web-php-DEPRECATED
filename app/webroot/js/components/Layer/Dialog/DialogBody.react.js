/**
 * DialogBody.react
 * @jsx React.DOM
 *
 * Main body of a modal dialog
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Loader/Loader.react',

], function(

    React,
    Loader

) {

  return React.createClass({
    displayName: 'DialogBody',

    propTypes: {
      isLoading: React.PropTypes.bool
    },

    render: function() {
      return (
        <div className="modal-body">
          {this.props.children}
          {this._renderLoader()}
        </div>
      );
    },

    _renderLoader: function() {
      if (this.props.isLoading) {
        return (
          <Loader background={true} full={true} />
        );
      }      
    }
  });

});
