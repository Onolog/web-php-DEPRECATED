var $ = require('jquery');
var React = require('react');
var cx = require('classnames');

var fbLoader = require('utils/fbLoader');
var UserActions = require('flux/actions/UserActions');

var INTERVAL = 1 * 60 * 1000; // 1 min

/**
 * BaseAppPage.react
 *
 * Base component for rendering the app page, with code that should execute on
 * every page.
 */
var BaseAppPage = React.createClass({
  displayName: 'BaseAppPage',

  componentDidMount: function() {
    fbLoader(() => {setInterval(this._checkLoginStatus, INTERVAL)});
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
