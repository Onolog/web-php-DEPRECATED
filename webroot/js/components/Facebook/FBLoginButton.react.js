import React from 'react';
import {Button} from 'react-bootstrap';

/**
 * FBLoginButton.react
 *
 * Renders a custom React FB login button.
 */
const FBLoginButton = props => (
  <Button
    bsSize="large"
    bsStyle="primary"
    className="fbLogin"
    onClick={props.onClick}>
    <i className="fbIcon" /> Sign in with Facebook
  </Button>
);

export default FBLoginButton;
