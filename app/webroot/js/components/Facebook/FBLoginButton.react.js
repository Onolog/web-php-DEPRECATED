var React = require('react');

var Button = require('../Button/Button.react');

/**
 * FBLoginButton.react
 * @jsx React.DOM
 *
 * Renders a custom React FB login button.
 */
var FBLoginButton = React.createClass({
  displayName: 'FBLoginButton',

  getInitialState: function() {
    return {
      signedOut: true
    };    
  },

  render: function() {
    return (
      <Button
        className="fbLogin"
        customGlyph={<i className="fbIcon" />}
        label={this._getLabel()}
        onClick={this.props.onClick}
        size="large"
        use="primary"
      />
    );
  },

  _getLabel: function() {
    return (
      this.state.signedOut ? 'Sign in with Facebook' : 'Sign out of Facebook'
    );
  }
});

module.exports = FBLoginButton;
