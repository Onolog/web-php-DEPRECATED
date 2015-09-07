/**
 * LoginController.react.js
 *
 * 
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Facebook/FBLoginButton.react',
  'actions/UserActions'

], function(

  React,
  FBLoginButton,
  UserActions

) {

  return React.createClass({
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

});
