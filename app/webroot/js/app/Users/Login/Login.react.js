var React = require('react');

var BaseAppPage = require('components/Page/BaseAppPage.react');
var FBLoginButton = require('components/Facebook/FBLoginButton.react');

var UserActions = require('flux/actions/UserActions');

require('../../../../css/app/Login.css');

/**
 * Login.react.js
 */
var Login = React.createClass({
  displayName: 'Login',

  getInitialState: function() {
    return {
      windowHeight: null
    };
  },

  componentDidMount: function() {
    this._resize();
    window.addEventListener('resize', this._resize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._resize);
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

  _resize: function() {
    var windowHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    this.setState({windowHeight});
  },
});

module.exports = Login;
