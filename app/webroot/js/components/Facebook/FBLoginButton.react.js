var React = require('react');
var Button = require('react-bootstrap/lib/Button');

/**
 * FBLoginButton.react
 *
 * Renders a custom React FB login button.
 */
var FBLoginButton = React.createClass({
  displayName: 'FBLoginButton',

  render: function() {
    return (
      <Button
        className="fbLogin"
        onClick={this.props.onClick}
        bsSize="large"
        bsStyle="primary">
        <i className="fbIcon" /> Sign in with Facebook
      </Button>
    );
  }
});

module.exports = FBLoginButton;
