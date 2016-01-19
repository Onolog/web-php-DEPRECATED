var React = require('react');

var CloseButton = require('components/Button/CloseButton.react');

var cx = require('classnames');

var USE = require('constants/Bootstrap').USE;

/**
 * Alert.react
 *
 * Display different types of alerts
 */
var Alert = React.createClass({
  displayName: 'Alert',

  propTypes: {
    dismissible: React.PropTypes.bool,
    type: React.PropTypes.oneOf([
      USE.DANGER,
      USE.INFO,
      USE.SUCCESS,
      USE.WARNING
    ])
  },

  getDefaultProps: function() {
    return {
      dismissible: false,
      type: USE.INFO
    };
  },

  getInitialState: function() {
    return {
      dismissed: false
    };
  },    

  render: function() {
    if (this.state.dismissed) {
      return <span />;
    }

    var type = this.props.type;
    return (
      <div
        className={cx({
          'alert': true,
          'alert-success': type === USE.SUCCESS,
          'alert-info': type === USE.INFO,
          'alert-warning': type === USE.WARNING,
          'alert-danger': type === USE.DANGER,
          'alert-dismissible': this.props.dismissible
        })}
        role="alert">
        {this._renderCloseButton()}
        {this.props.children}
      </div>
    );
  },

  _renderCloseButton: function() {
    if (this.props.dismissible) {
      return <CloseButton onClick={this._onDismiss} />;
    }
  },

  _onDismiss: function(/*object*/ event) {
    this.setState({ dismissed: true });
  }

});

module.exports = Alert;
