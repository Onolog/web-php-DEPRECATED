import cx from 'classnames';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import {loginIfNeeded} from 'actions/session';
import fbLoader from 'utils/fbLoader';

const INTERVAL = 1000 * 60; // 1 min
const LOGIN_PATH = '/login';

const mapStateToProps = ({session}) => {
  return {
    session,
  };
};

/**
 * BaseAppPage.react
 *
 * Base component for rendering the app page, with code that should execute on
 * every page.
 */
const BaseAppPage = React.createClass({
  displayName: 'BaseAppPage',

  propTypes: {
    session: PropTypes.shape({
      time: PropTypes.number.isRequired,
    }),
  },

  componentWillReceiveProps(nextProps) {
    const {session} = this.props;
    const nextSession = nextProps.session;

    // User has successfully logged in.
    if (!session.id && nextSession.id) {
      document.location.reload();
    }

    // User has successfully logged out.
    if (session.id && !nextSession.id) {
      document.location = LOGIN_PATH;
    }
  },

  componentDidMount() {
    fbLoader(() => setInterval(this._checkLoginStatus, INTERVAL));
  },

  componentWillUnmount() {
    clearInterval();
  },

  getInitialState() {
    return {
      show: false,
    };
  },

  render() {
    return (
      <div className={cx('app', this.props.className)}>
        {this.props.children}
        <Modal show={this.state.show}>
          <Modal.Header>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You{"'"}ve been logged out. Please log back in.
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this._handleLogin}>
              Log In
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },

  _checkLoginStatus() {
    if (document.location.pathname === LOGIN_PATH) {
      // If the user is on the login page, they're obviously logged out.
      clearInterval();
      return;
    }

    const {dispatch, session} = this.props;

    let isLoggedOut = false;
    FB.getLoginStatus((response) => {
      if (response.status !== 'connected') {
        // Logged out from Facebook.
        isLoggedOut = true;
      } else if (session.time) {
        // Session timeout.
        isLoggedOut = moment().isAfter(moment.unix(session.time));
      }

      if (isLoggedOut && !this.state.show) {
        // Stop checking for login state and display a message if the user is
        // logged out.
        clearInterval();
        // dispatch(sessionTimeout());
        this.setState({show: true});
      }
    });
  },

  _handleLogin() {
    this.props.dispatch(loginIfNeeded());
  },
});

module.exports = connect(mapStateToProps)(BaseAppPage);
