import {find, keys} from 'lodash';
import React, {PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppPage from 'components/Page/AppPage.react';
import EmptyState from 'components/EmptyState.react';
import Loader from 'components/Loader/Loader.react';
import PageHeader from 'components/Page/PageHeader.react';
import ProfileYearPanel from './ProfileYearPanel.react';
import Topline from 'components/Topline/Topline.react';

import {fetchProfile} from 'actions/users';
import {getAggregateDistance, groupActivities} from 'utils/ActivityUtils';

import '../../../../css/app/Profile.css';

const mapStateToProps = ({activities, shoes, users}) => {
  return {
    activities,
    shoes,
    users,
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
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  },

  componentWillMount() {
    this._fetchData(this.props.params.userId);
  },

  componentWillReceiveProps(nextProps) {
    this.setState(this.getInitialState());
  },

  getInitialState() {
    return {
      isLoading: false,
    };
  },

  render() {
    const {activities, params, users} = this.props;
    const user = find(users, {id: +params.userId});

    if (this.state.isLoading) {
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

  _fetchData(userId) {
    this.props.dispatch(fetchProfile(userId));
    this.setState({isLoading: true});
  },
});

export default connect(mapStateToProps)(Profile);
