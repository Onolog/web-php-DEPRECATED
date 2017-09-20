import {find, meanBy} from 'lodash';
import moment from 'moment-timezone';
import {Button, ButtonGroup, OverlayTrigger, Tooltip} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import Activity from 'components/Activities/Activity.react';
import ActivityChart from 'components/Data/ActivityChart.react';
import ActivityModal from 'components/Activities/ActivityModal.react';
import ActivitySection from 'components/Activities/ActivitySection.react';
import AppFullPage from 'components/Page/AppFullPage.react';
import Loader from 'components/Loader/Loader.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';

import {deleteActivity, fetchActivity} from 'actions/activities';
import {metersToFeet, metersToMiles} from 'utils/distanceUtils';
import homeUrl from 'utils/homeUrl';
import speedToPace from 'utils/speedToPace';

import {ACTIVITY_FETCH, ACTIVITY_DELETE, ACTIVITY_UPDATE} from 'constants/ActionTypes';
import {METRICS} from 'constants/Garmin';

const DATE_FORMAT = 'dddd, MMMM Do, YYYY';

const mapStateToProps = (state, props) => {
  const {
    activities,
    activityMetrics,
    pendingRequests,
    session,
    shoes,
    users,
  } = state;

  const activity = find(activities, {id: +props.params.activityId});

  return {
    activity,
    activityMetrics,
    athlete: activity && find(users, {id: activity.user_id}),
    pendingRequests,
    shoe: activity && find(shoes, {id: activity.shoe_id}),
    viewer: session,
  };
};

const convertActivityMetrics = activityMetrics => {
  const meanPace = meanBy(activityMetrics, ({metrics}) => {
    if (metrics[METRICS.SPEED]) {
      return speedToPace(metrics[METRICS.SPEED]);
    }
  });

  return activityMetrics.reduce((converted, {metrics}, idx, metricsArr) => {
    const lat = metrics[METRICS.LATITUDE];
    const lng = metrics[METRICS.LONGITUDE];

    if (lat && lng) {
      // Normalize & compress outlying data.
      // TODO: Don't modify the data, change the bounds of the chart.
      const paceThreshold = Math.pow(meanPace, 2) / 400;
      const pace = speedToPace(metrics[METRICS.SPEED]);

      converted.push({
        distance: metersToMiles(metrics[METRICS.SUM_DISTANCE]),
        elevation: metersToFeet(metrics[METRICS.ELEVATION]),
        hr: metrics[METRICS.HEART_RATE] || 0,
        lat,
        lng,
        pace: !pace || pace > paceThreshold ? paceThreshold : pace,
      });
    }

    return converted;
  }, []);
};

/**
 * ActivityController.react
 *
 * Displays a single activity.
 */
class ActivityController extends React.Component {
  static propTypes = {
    activity: PropTypes.object,
    athlete: PropTypes.object,
    pendingRequests: PropTypes.object.isRequired,
    shoe: PropTypes.object,
    viewer: PropTypes.object,
  };

  state = {
    showModal: false,
  };

  componentWillMount() {
    this.props.dispatch(fetchActivity(+this.props.params.activityId));
  }

  componentWillReceiveProps(nextProps) {
    const {pendingRequests} = this.props;

    if (
      pendingRequests[ACTIVITY_UPDATE] &&
      !nextProps.pendingRequests[ACTIVITY_UPDATE]
    ) {
      this.setState({showModal: false});
    }

    // Redirect if the activity was deleted.
    if (pendingRequests[ACTIVITY_DELETE] && !nextProps.activity) {
      browserHistory.push(homeUrl());
      return;
    }
  }

  render() {
    const {activity, athlete, pendingRequests, shoe} = this.props;

    if (!activity || pendingRequests[ACTIVITY_FETCH]) {
      return (
        <AppFullPage>
          <Loader background full />
        </AppFullPage>
      );
    }

    const activityDate = moment.tz(
      activity.start_date,
      activity.timezone
    ).format(DATE_FORMAT);

    return (
      <AppFullPage title={activityDate}>
        <PageHeader full title={activityDate}>
          {this._renderButtonGroup()}
        </PageHeader>
        <PageFrame fill scroll>
          <Activity
            activity={activity}
            athlete={athlete}
            fill
            shoe={shoe}
          />
          {this._renderActivityMetrics()}
        </PageFrame>
      </AppFullPage>
    );
  }

  _renderButtonGroup = () => {
    const {activity, viewer} = this.props;
    const {showModal} = this.state;

    if (viewer.id === activity.user_id) {
      return (
        <ButtonGroup bsSize="small">
          <OverlayTrigger
            overlay={<Tooltip id="edit">Edit Activity</Tooltip>}
            placement="bottom">
            <Button onClick={this._handleActivityEdit}>
              <MaterialIcon icon="pencil" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="delete">Delete Activity</Tooltip>}
            placement="bottom">
            <Button onClick={this._handleActivityDelete}>
              <MaterialIcon icon="delete" />
            </Button>
          </OverlayTrigger>
          <ActivityModal
            initialActivity={activity}
            onHide={() => this.setState({showModal: false})}
            show={showModal}
          />
        </ButtonGroup>
      );
    }
  };

  _renderActivityMetrics = () => {
    const metrics = convertActivityMetrics(this.props.activityMetrics);
    if (metrics && metrics.length) {
      return (
        <ActivitySection border title="Data">
          <ActivityChart data={metrics} />
        </ActivitySection>
      );
    }
  };

  _handleActivityDelete = () => {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.props.dispatch(deleteActivity(this.props.activity.id));
    }
  };

  _handleActivityEdit = () => {
    this.setState({showModal: true});
  };
}

module.exports = connect(mapStateToProps)(ActivityController);
