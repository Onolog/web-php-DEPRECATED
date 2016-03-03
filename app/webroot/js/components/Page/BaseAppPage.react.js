var $ = require('jquery');
var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var {Button, Modal} = require('react-bootstrap');

var fbLoader = require('utils/fbLoader');
var UserActions = require('flux/actions/UserActions');
var UserStore = require('flux/stores/UserStore');

const {CHANGE} = require('flux/ActionTypes');
const INTERVAL = 1 * 60; // * 1000; // 1 min

/**
 * BaseAppPage.react
 *
 * Base component for rendering the app page, with code that should execute on
 * every page.
 */
var BaseAppPage = React.createClass({
  displayName: 'BaseAppPage',

  componentDidMount() {
    fbLoader(() => {
      UserStore.bind(CHANGE, this._checkLoginStatus);
      setInterval(this._checkLoginStatus, INTERVAL);
    });
  },

  componentWillUnmount() {
    clearInterval();
    UserStore.unbind(CHANGE, this._checkLoginStatus);
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
            <Button bsStyle="primary" onClick={UserActions.login}>
              Log In
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },

  _checkLoginStatus() {
    if (document.location.pathname === '/login') {
      // If the user is on the login page, they're obviously logged out.
      clearInterval();
      return;
    }

    let isLoggedOut = false;
    let session = UserStore.getSession();
    let time = session && session.time;

    FB.getLoginStatus((response) => {
      if (response.status !== 'connected') {
        isLoggedOut = true;
      } else if (time) {
        isLoggedOut = moment().isAfter(moment.unix(time));
      }

      if (isLoggedOut && !this.state.show) {
        // Stop checking for login state and display a message if the user is
        // logged out.
        clearInterval();
        this.setState({show: true});
      }
    });
  },
});

module.exports = BaseAppPage;
