/**
 * DialogFooter.react
 * @jsx React.DOM
 *
 * Footer portion of a modal dialog
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'DialogFooter',

    render: function() {
      return (
        <div className="modal-footer">
          {this.props.children}
        </div>
      );
    }
  });

});
