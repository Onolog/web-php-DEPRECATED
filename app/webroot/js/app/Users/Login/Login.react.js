var $ = require('jquery');
var React = require('react');

var BaseAppPage = require('../../../components/Page/BaseAppPage.react');
var FBLoginButton = require('../../../components/Facebook/FBLoginButton.react');

var UserActions = require('../../../flux/actions/UserActions');

require('../../../../css/app/Login.css');

/**
 * Login.react.js
 */
var Login = React.createClass({
  displayName: 'Login',

  getInitialState: function() {
    return {
      windowHeight: this._getWindowHeight()
    };
  },

  componentDidMount: function() {
    $(window).resize(function() {
      this.setState({ windowHeight: this._getWindowHeight() });
    }.bind(this));
  },

  render: function() {
    return (
      <BaseAppPage className="login">
        <div
          className="jumbotronContainer"
          style={{height: this.state.windowHeight + 'px'}}>
          <div className="jumbotron">
            <h1>Onolog</h1>
            <p className="lead">
              Running is better with friends.
            </p>
            <p><FBLoginButton onClick={UserActions.login} /></p>
          </div>
          <div className="bgImage"></div>
        </div>
      </BaseAppPage>
    ); 
  },

  _renderMarketingSection: function(title) {
    return (
      <div className="marketingSection">
        <div className="container">
          <h2>{title}</h2>
        </div>
      </div>
    );
  },

  _getWindowHeight: function() {
    return $(window).height();
  }
});

module.exports = Login;
