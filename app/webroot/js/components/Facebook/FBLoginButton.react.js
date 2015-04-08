/**
 * FBLoginButton.react
 * @jsx React.DOM
 *
 * Renders a custom React FB login button.
 *
 * TODO: Bundle login code here
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Button/Button.react',

], function(

  React,
  Button

) {

  return React.createClass({
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

});
