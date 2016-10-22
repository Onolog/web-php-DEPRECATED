import {find, keys} from 'lodash';
import React, {PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppPage from 'components/Page/AppPage.react';
import EmptyState from 'components/EmptyState.react';
import Loader from 'components/Loader/Loader.react';
import PageHeader from 'components/Page/PageHeader.react';
import ProfileYearPanel from 'components/Profile/ProfileYearPanel.react';
import Topline from 'components/Topline/Topline.react';

import {fetchProfile} from 'actions/users';
import {getAggregateDistance, groupActivities} from 'utils/ActivityUtils';

import {PROFILE_FETCH} from 'constants/ActionTypes';

import 'components/Profile/Profile.css';

const mapStateToProps = ({activities, pendingRequests, shoes, users}) => {
  return {
    activities,
    pendingRequests,
    shoes,
    users,
  };
};

/**
 * ProfileController.react
 */
const ProfileController = React.createClass({
  propTypes: {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    shoes: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  },

  componentWillMount() {
    this.props.dispatch(fetchProfile(this.props.params.userId));
  },

  render() {
    const {activities, params, pendingRequests, users} = this.props;
    const user = find(users, {id: +params.userId});

    if (!user || pendingRequests[PROFILE_FETCH]) {
      return (
        <AppPage>
          <Loader />
        </AppPage>
      );
    }

    return (
      <AppPage className="profile">
        <PageHeader title={user.name} />
        {this._renderToplineStats(activities)}
        {this._renderContent(activities)}
      </AppPage>
    );
  },

  _renderToplineStats(activities) {
    const totalMiles = getAggregateDistance(activities);
    const totalRuns = activities.length;

    return (
      <Panel header={<h3>Lifetime Stats</h3>}>
        <Topline>
          <Topline.Item label="Miles">
            {totalMiles.toLocaleString()}
          </Topline.Item>
          <Topline.Item label="Runs">
            {totalRuns.toLocaleString()}
          </Topline.Item>
          <Topline.Item label="Shoes">
            {this.props.shoes.length}
          </Topline.Item>
        </Topline>
      </Panel>
    );
  },

  _renderContent(activities) {
    // Render an empty state when there's no data.
    if (!activities.length) {
      return (
        <Panel>
          <EmptyState>You have no activities. Get out there!</EmptyState>
        </Panel>
      );
    }

    const activitiesByYear = groupActivities.byYear(activities);
    const years = keys(activitiesByYear).reverse();

    return years.map((year) => {
      return (
        <ProfileYearPanel
          activities={activitiesByYear[year]}
          key={year}
          year={year}
        />
      );
    });
  },
});

module.exports = connect(mapStateToProps)(ProfileController);
