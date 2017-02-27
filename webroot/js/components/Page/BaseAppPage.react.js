import cx from 'classnames';
// import moment from 'moment';
import React, {PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import AlertModal from 'components/Modals/AlertModal.react';

import {clearError} from 'actions/error';
import {loginIfNeeded} from 'actions/session';
import fbLoader from 'utils/fbLoader';

const INTERVAL = 60000; // 1 min
const LOGIN_PATH = '/login';

const renderTitle = title => {
  const prefix = 'Onolog';
  return title ? `${prefix} \u00b7 ${title}` : prefix;
};

const mapStateToProps = ({error}) => {
  return {
    error,
  };
};

/**
 * BaseAppPage.react
 *
 * Base component for rendering the app page, with code that should execute on
 * every page.
 */
const BaseAppPage = React.createClass({

  propTypes: {
    error: PropTypes.object,
    session: PropTypes.shape({
      time: PropTypes.number.isRequired,
    }),
    title: PropTypes.string,
  },

  componentWillMount() {
    // Set the browser page title.
    document.title = renderTitle(this.props.title);
  },

  componentWillReceiveProps(nextProps) {
    const {session} = this.props;
    const nextSession = nextProps.session;

    // User has successfully logged in.
    if (!session.id && nextSession.id) {
      document.location.reload();
      return;
    }

    // User has successfully logged out.
    if (session.id && !nextSession.id) {
      document.location = LOGIN_PATH;
      return;
    }

    // Update the browser page title on transitions.
    if (this.props.title !== nextProps.title) {
      document.title = renderTitle(nextProps.title);
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
        {this._renderErrorModal()}
        {this._renderSessionModal()}
      </div>
    );
  },

  _renderErrorModal() {
    const {dispatch, error} = this.props;
    const onHide = () => dispatch(clearError());

    return (
      <AlertModal
        bsStyle="danger"
        onHide={onHide}
        show={!!error}>
        {error && error.message}
      </AlertModal>
    );
  },

  _renderSessionModal() {
    return (
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
    );
  },

  _checkLoginStatus() {
    if (document.location.pathname === LOGIN_PATH) {
      // If the user is on the login page, they're obviously logged out.
      clearInterval();
      return;
    }

    const {session} = this.props;

    let isLoggedOut = false;
    FB.getLoginStatus(response => {
      if (response.status !== 'connected') {
        // Logged out from Facebook.
        isLoggedOut = true;
      } else if (session.time) {
        // Session timeout.
        // isLoggedOut = moment().isAfter(moment.unix(session.time));
      }

      if (isLoggedOut && !this.state.show) {
        // Stop checking for login state and display a message if the user is
        // logged out.
        clearInterval();
        // TODO: dispatch a session timeout.
        this.setState({show: true});
      }
    });
  },

  _handleLogin() {
    this.props.dispatch(loginIfNeeded());
  },
});

export default connect(mapStateToProps)(BaseAppPage);
