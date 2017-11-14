import cx from 'classnames';
import {find} from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {Col, Row, Tab, Tabs} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

import ActivityFeed from 'components/Activities/ActivityFeed.react';
import AppFullPage from 'components/Page/AppFullPage.react';
import Distance from 'components/Distance/Distance.react';
import FBImage from 'components/Facebook/FBImage.react';
import Loader from 'components/Loader/Loader.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';
import Topline from 'components/Topline/Topline.react';

import {toggleSideNav} from 'actions/navigation';
import {fetchProfile} from 'actions/users';

import {PROFILE_FETCH} from 'constants/ActionTypes';

import 'components/Profile/Profile.scss';

const SummaryShape = PropTypes.shape({
  activity_count: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
});

const ProfileDetails = ({user}) => {
  const userLocation = user.location ?
    <li>
      <MaterialIcon icon="map-marker" />
      {user.location}
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
  const {activities, activitySummary, pendingRequests, users} = state;
  return {
    activities,
    activitySummary,
    pendingRequests,
    user: find(users, {id: +props.params.userId}),
  };
};

/**
 * ProfileController.react
 */
class ProfileController extends React.Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
    activitySummary: PropTypes.shape({
      month: SummaryShape,
      week: SummaryShape,
      year: SummaryShape,
    }).isRequired,
    pendingRequests: PropTypes.object.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  };

  state = {
    showHeader: false,
  };

  componentWillMount() {
    this._fetchProfileData(this.props);
    window.addEventListener('scroll', this._showHeaderCheck, true);
  }

  componentWillReceiveProps(nextProps) {
    // Re-fetch data when navigating to a different profile.
    if (this.props.params.userId !== nextProps.params.userId) {
      this._fetchProfileData(nextProps);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._showHeaderCheck, true);
  }

  _showHeaderCheck = () => {
    const node = findDOMNode(this._profileImageName);
    const {bottom} = node.getBoundingClientRect();
    const showHeader = bottom <= 0;

    if (showHeader !== this.state.showHeader) {
      this.setState({showHeader});
    }
  };

  render() {
    const {user} = this.props;
    return (
      <AppFullPage className="profile" title={user && user.name}>
        {this._renderContents()}
      </AppFullPage>
    );
  }

  _renderContents = () => {
    const {
      activities,
      dispatch,
      pendingRequests,
      user,
    } = this.props;

    if (!user || pendingRequests[PROFILE_FETCH]) {
      return <Loader background full />;
    }

    return (
      <PageFrame fill scroll>
        <PageHeader
          className={cx('profile-header', {
            'profile-header-fixed': this.state.showHeader,
          })}
          full
          title={user.name}
        />
        <div className="profile-cover">
          <NavbarToggle
            className="visible-xs-block"
            onClick={() => dispatch(toggleSideNav())}
          />
        </div>
        <Row className="profile-content">
          <Col className="profile-info-col" sm={3}>

            <div
              className="profile-image-name-container"
              ref={(r) => this._profileImageName = r}>
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
                <ActivityFeed activities={activities} />
              </Col>
              <Col lg={4}>
                {this._renderActivitySummary()}
                {/*<h4>Friends</h4>*/}
              </Col>
            </Row>
          </Col>
        </Row>
      </PageFrame>
    );
  };

  _renderActivitySummary = () => {
    const {month, week, year} = this.props.activitySummary;

    if (!month || !week || !year) {
      return;
    }

    const tabs = [
      {data: week, title: 'This Week'},
      {data: month, title: 'This Month'},
      {data: year, title: 'This Year'},
    ];

    return (
      <Tabs
        animation={false}
        bsStyle="pills"
        className="activity-summary"
        id="activity-summary"
        justified>
        {tabs.map(({data, title}, idx) => (
          <Tab eventKey={idx + 1} key={title} title={title}>
            <Topline>
              <Topline.Item annotation={<Distance.Label />} label="Distance">
                <Distance distance={data.distance} label={false} />
              </Topline.Item>
              <Topline.Item label="Activities">
                {data.activity_count}
              </Topline.Item>
            </Topline>
          </Tab>
        ))}
      </Tabs>
    );
  };

  _fetchProfileData = ({dispatch, params}) => {
    dispatch(fetchProfile(params.userId));
  };
}

module.exports = connect(mapStateToProps)(ProfileController);
