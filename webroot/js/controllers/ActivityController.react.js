import {find} from 'lodash';
import moment from 'moment-timezone';
import {
  Button,
  ButtonGroup,
  OverlayTrigger,
  Panel,
  Tooltip,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import Activity from 'components/Activities/Activity.react';
import ActivityModal from 'components/Activities/ActivityModal.react';
import AppPage from 'components/Page/AppPage.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';

import {ACTIVITY_UPDATE} from 'constants/ActionTypes';

const DATE_FORMAT = 'dddd, MMMM Do, YYYY';

const mapStateToProps = (state, props) => {
  const {activities, pendingRequests, session, shoes, users} = state;
  const activity = find(activities, {id: +props.params.activityId});

  return {
    activity,
    athlete: find(users, {id: activity.user_id}),
    pendingRequests,
    shoe: find(shoes, {id: activity.shoe_id}),
    viewer: session,
  };
};

/**
 * ActivityController.react
 *
 * Displays a single activity.
 */
const ActivityController = React.createClass({

  propTypes: {
    activity: PropTypes.object.isRequired,
    athlete: PropTypes.object.isRequired,
    pendingRequests: PropTypes.object.isRequired,
    shoe: PropTypes.object,
    viewer: PropTypes.object,
  },

  getInitialState() {
    return {
      showModal: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    const {pendingRequests} = this.props;
    if (
      pendingRequests[ACTIVITY_UPDATE] &&
      !nextProps.pendingRequests[ACTIVITY_UPDATE]
    ) {
      this.setState({showModal: false});
    }
  },

  render() {
    const {activity, athlete, shoe} = this.props;
    return (
      <AppPage
        narrow
        title={moment.tz(
          activity.start_date,
          activity.timezone
        ).format(DATE_FORMAT)}>
        <Panel footer={this._renderButtonGroup()}>
          <Activity
            activity={activity}
            athlete={athlete}
            fill
            shoe={shoe}
          />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup() {
    const {activity, viewer} = this.props;
    const {showModal} = this.state;

    if (viewer.id === activity.user_id) {
      return (
        <ButtonGroup>
          <OverlayTrigger
            overlay={<Tooltip id="edit">Edit Activity</Tooltip>}
            placement="top">
            <Button onClick={this._handleActivityEdit}>
              <MaterialIcon icon="pencil" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="delete">Delete Activity</Tooltip>}
            placement="top">
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
  },

  /**
   * TODO: Handle this better...
   */
  _handleActivityDelete() {
    if (confirm('Are you sure you want to delete this shoe?')) {
      document.location = `/workouts/delete/${this.props.activity.id}`;
    }
  },

  _handleActivityEdit() {
    this.setState({showModal: true});
  },
});

module.exports = connect(mapStateToProps)(ActivityController);
