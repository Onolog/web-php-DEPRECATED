import {find, keys} from 'lodash';
import React, {PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppPage from 'components/Page/AppPage.react';
import EmptyState from 'components/EmptyState.react';
import PageHeader from 'components/Page/PageHeader.react';
import ProfileYearPanel from './ProfileYearPanel.react';
import Topline from 'components/Topline/Topline.react';

import {getAggregateDistance, groupActivities} from 'utils/ActivityUtils';
import getIdFromPath from 'utils/getIdFromPath';

require('../../../../css/app/Profile.css');

const mapStateToProps = ({activities, shoes, users}) => {
  return {
    activities,
    shoes,
    user: find(users, {id: getIdFromPath()}),
  };
};

/**
 * Profile.react
 */
const Profile = React.createClass({
  displayName: 'Profile',

  propTypes: {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    shoes: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  },

  render() {
    const {activities, user} = this.props;

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

    var activitiesByYear = groupActivities.byYear(activities);
    var years = keys(activitiesByYear).reverse();

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

module.exports = connect(mapStateToProps)(Profile);
