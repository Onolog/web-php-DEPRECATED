import React from 'react';
import {connect} from 'react-redux';

import BaseAppPage from 'components/Page/BaseAppPage.react';
import FBLoginButton from 'components/Facebook/FBLoginButton.react';

import {loginIfNeeded} from 'actions/session';

import 'components/Login/css/Login.css';

const mapStateToProps = ({session}) => {
  return {
    session,
  };
};

/**
 * Login.react.js
 */
const Login = React.createClass({

  getInitialState() {
    return {
      windowHeight: null,
    };
  },

  componentDidMount() {
    this._handleResize();
    window.addEventListener('resize', this._handleResize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },

  render() {
    return (
      <BaseAppPage className="login" session={this.props.session}>
        <div
          className="jumbotronContainer"
          style={{height: this.state.windowHeight + 'px'}}>
          <div className="jumbotron">
            <h1>Onolog</h1>
            <p className="lead">
              Running is better with friends.
            </p>
            <p><FBLoginButton onClick={this._handleLogin} /></p>
          </div>
          <div className="bgImage"></div>
        </div>
      </BaseAppPage>
    );
  },

  _renderMarketingSection(title) {
    return (
      <div className="marketingSection">
        <div className="container">
          <h2>{title}</h2>
        </div>
      </div>
    );
  },

  _handleLogin() {
    this.props.dispatch(loginIfNeeded());
  },

  _handleResize() {
    var windowHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    this.setState({windowHeight});
  },
});

module.exports = connect(mapStateToProps)(Login);
