var React = require('react');

/**
 * ModalBody.react
 *
 * Main body of a modal dialog
 */
var ModalBody = React.createClass({
  displayName: 'ModalBody',

  render: function() {
    return (
      <div className="modal-body">
        {this.props.children}
      </div>
    );
  }
});

module.exports = ModalBody;
