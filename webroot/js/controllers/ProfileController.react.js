import {find} from 'lodash';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppFullPage from 'components/Page/AppFullPage.react';
import FBImage from 'components/Facebook/FBImage.react';
import Loader from 'components/Loader/Loader.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';
import PageFrame from 'components/Page/PageFrame.react';

import {toggleSideNav} from 'actions/navigation';
import {fetchProfile} from 'actions/users';

import {PROFILE_FETCH} from 'constants/ActionTypes';

import 'components/Profile/Profile.scss';

const ProfileDetails = ({user}) => {
  const userLocation = user.location ?
    <li>
      <MaterialIcon icon="map-marker" />
      Los Altos, CA
    </li> :
    null;

  return (
    <ul className="profile-details">
      {userLocation}
      <li>
        <MaterialIcon icon="calendar" />
        Joined {moment(user.created).format('MMMM YYYY')}
      </li>
    </ul>
  );
};

const mapStateToProps = (state, props) => {
  const {pendingRequests, users} = state;
  return {
    pendingRequests,
    user: find(users, {id: +props.params.userId}),
  };
};

/**
 * ProfileController.react
 */
const ProfileController = React.createClass({
  propTypes: {
    pendingRequests: PropTypes.object.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  },

  componentWillMount() {
    this.props.dispatch(fetchProfile(this.props.params.userId));
  },

  render() {
    return (
      <AppFullPage className="profile">
        {this._renderContents()}
      </AppFullPage>
    );
  },

  _renderContents() {
    const {dispatch, pendingRequests, user} = this.props;
    if (!user || pendingRequests[PROFILE_FETCH]) {
      return <Loader background full />;
    }

    return (
      <PageFrame fill scroll>
        <div className="profile-cover">
          <NavbarToggle
            className="visible-xs-block"
            onClick={() => dispatch(toggleSideNav())}
          />
        </div>
        <Row className="profile-content">
          <Col className="profile-info-col" sm={3}>

            <div className="profile-image-name-container">
              <div className="profile-image">
                <FBImage fbid={user.id} height={180} width={180} />
              </div>
              <h2 className="profile-name">
                {user.name}
              </h2>
            </div>

            <ProfileDetails user={user} />

          </Col>
          <Col className="profile-main-col" sm={9}>
            <Row>
              <Col lg={8}>
                <div className="placeholder" />
              </Col>
              <Col lg={4}>
                <div className="placeholder" />
              </Col>
            </Row>
          </Col>
        </Row>
      </PageFrame>
    );
  },
});

module.exports = connect(mapStateToProps)(ProfileController);
