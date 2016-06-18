import React from 'react';
import {Button} from 'react-bootstrap/lib';

/**
 * FBLoginButton.react
 *
 * Renders a custom React FB login button.
 */
const FBLoginButton = React.createClass({
  displayName: 'FBLoginButton',

  render: function() {
    return (
      <Button
        bsSize="large"
        bsStyle="primary"
        className="fbLogin"
        onClick={this.props.onClick}>
        <i className="fbIcon" /> Sign in with Facebook
      </Button>
    );
  },
});

module.exports = FBLoginButton;
