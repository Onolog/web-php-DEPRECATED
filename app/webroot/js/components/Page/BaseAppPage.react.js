var $ = require('jquery');
var React = require('react');
var cx = require('classnames');

var FBLoader = require('lib/Facebook/fb');
var UserActions = require('flux/actions/UserActions');

var INTERVAL = 1 * 60 * 1000; // 1 min

/**
 * BaseAppPage.react
 * @jsx React.DOM
 *
 * Base component for rendering the app page, with code that should execute on
 * every page.
 */
var BaseAppPage = React.createClass({
  displayName: 'BaseAppPage',

  componentDidMount: function() {
    FBLoader(function() {
      setInterval(this._checkLoginStatus, INTERVAL);
    }.bind(this));
  },

  componentWillUnmount: function() {
    clearInterval();
  },

  render: function() {
    return (
      <div className={cx('app', this.props.className)}>
        {this.props.children}
      </div>
    );
  },

  _checkLoginStatus: function() {
    FB.getLoginStatus(function(response) {
      if (response.status !== 'connected') {
        // Stop checking for login state if the user is logged out.
        clearInterval();
        if (confirm('You have been logged out. Please log back in.')) {
          // Fully log out of the app and redirect to the login page.
          UserActions.logout();
        }
      }
    });
  }
});

module.exports = BaseAppPage;
