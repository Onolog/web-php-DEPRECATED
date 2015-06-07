/**
 * LoginController.react.js
 *
 * 
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Facebook/FBLoginButton.react',
  'utils/pad',
  'utils/ResponseHandler',
  'lib/jquery/jquery.min',
  'facebook'

], function(

  React,
  FBLoginButton,
  pad,
  ResponseHandler

) {

  // Set permission scope here  
  var permissions = {
    scope: [
      'email',
      'public_profile',
      'user_friends',
      'user_location'
    ].join(',')
  };

  function onSuccess(response) {
    var response = new ResponseHandler(response);
    if (response.getWasSuccessful()) {
      var date = new Date();
      var year = date.getFullYear();
      var month = pad(date.getMonth() + 1, 2);

      // If successful, redirect to the calendar view for the current month.
      document.location = '/' + year + '/' + month;
      return;
    }

    alert('There was a problem logging in. Please try again later.');
  }

  function _fbConnect() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
  };

  function _fbLogin() {
    FB.login(function(response) {
      if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
        FB.api('/me', function(response) {
          // Send info to server
          response.accessToken = accessToken;
          $.ajax({
            url: '/ajax/users/login',
            type: 'POST',
            data: response,
            success: onSuccess
          });
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
