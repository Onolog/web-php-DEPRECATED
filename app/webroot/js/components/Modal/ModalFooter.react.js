var React = require('react');

/**
 * ModalFooter.react
 *
 * Footer portion of a modal dialog
 */
var ModalFooter = React.createClass({
  displayName: 'ModalFooter',

  render: function() {
    return (
      <div className="modal-footer">
        {this.props.children}
      </div>
    );
  }
});

module.exports = ModalFooter;
