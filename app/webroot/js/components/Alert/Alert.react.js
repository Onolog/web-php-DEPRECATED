/**
 * Alert.react
 * @jsx React.DOM
 *
 * Display different types of alerts
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Button/CloseButton.react',
  'constants/Components',
  'utils/cx'

], function(React, CloseButton, Components, cx) {

  var ALERT = Components.ALERT;

  return React.createClass({
    displayName: 'Alert',

    propTypes: {
      dismissible: React.PropTypes.bool,
      type: React.PropTypes.oneOf([
        ALERT.DANGER,
        ALERT.INFO,
        ALERT.SUCCESS,
        ALERT.WARNING
      ])
    },

    getDefaultProps: function() {
      return {
        dismissible: false,
        type: ALERT.INFO
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

      var props = this.props;
      return (
        <div
          className={cx({
            'alert': true,
            'alert-success': props.type === ALERT.SUCCESS,
            'alert-info': props.type === ALERT.INFO,
            'alert-warning': props.type === ALERT.WARNING,
            'alert-danger': props.type === ALERT.DANGER,
            'alert-dismissible': props.dismissible
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

});
