/**
 * ModalBody.react
 * @jsx React.DOM
 *
 * Main body of a modal dialog
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'ModalBody',

    render: function() {
      return (
        <div className="modal-body">
          {this.props.children}
        </div>
      );
    }
  });

});
