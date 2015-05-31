/**
 * LoginController.react.js
 *
 * 
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Facebook/FBLoginButton.react',
  'lib/jquery/jquery.min',

], function(React, FBLoginButton) {

  // Set permission scope here  
  var permissions = {
    scope: [
      'email',
      'public_profile',
      'user_friends',
      'user_location'
    ].join(',')
  };

  function _fbConnect() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
  };

  function _fbLogin() {
    FB.login(function(response) {
      if (response.authResponse) {
        access_token = response.authResponse.accessToken;
        user_id = response.authResponse.userID;
  
        FB.api('/me', function(response) {
          user_email = response.email; // get user email
          // You can store this data into your database             
        });
      } else {
        // user hit cancel button
      }
    }, permissions);
  };

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
            <p><FBLoginButton onClick={this._onLogin} /></p>
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
    },

    _onLogin: function() {
      _fbLogin(_fbConnect());
    }
  });

});
