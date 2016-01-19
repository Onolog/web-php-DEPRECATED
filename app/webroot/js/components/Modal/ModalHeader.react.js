var React = require('react');

var CloseButton = require('components/Button/CloseButton.react');

/**
 * ModalHeader.react
 *
 * Header portion of a modal dialog
 */
var ModalHeader = React.createClass({
  displayName: 'ModalHeader',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func,
    useCloseButton: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      useCloseButton: true
    };
  },

  render: function() {
    return (
      <div className="modal-header">
        {this._renderCloseButton()}
        <h4 className="modal-title">
          {this.props.title}
        </h4>
      </div>
    );
  },

  _renderCloseButton: function() {
    if (this.props.useCloseButton) {
      return <CloseButton onClick={this._onClose} />;
    }
  },

  _onClose: function(/*object*/ event) {
    this.props.onClose && this.props.onClose(event);
  }
});

module.exports = ModalHeader;
