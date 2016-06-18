import {find} from 'lodash';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
} from 'react-bootstrap';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Activity from 'app/Activities/Activity.react';
import ActivityModal from 'app/Users/Home/ActivityModal.react';
import AppPage from 'components/Page/AppPage.react';

import getIdFromPath from 'utils/getIdFromPath';

const mapStateToProps = ({activities, session, shoes, users}) => {
  const activity = find(activities, {id: getIdFromPath()});
  return {
    activity,
    athlete: find(users, {id: activity.user_id}),
    shoe: find(shoes, {id: activity.shoe_id}),
    viewer: session,
  };
};

/**
 * WorkoutViewPage.react
 *
 * Displays the page header and view for a single activity.
 */
const WorkoutViewPage = React.createClass({
  displayName: 'WorkoutViewPage',

  propTypes: {
    activity: PropTypes.object.isRequired,
    athlete: PropTypes.object.isRequired,
    shoe: PropTypes.object,
    viewer: PropTypes.object,
  },

  getInitialState() {
    return {
      showModal: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({showModal: false});
  },

  render() {
    const {activity, athlete, shoe} = this.props;
    return (
      <AppPage narrow>
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
              <Glyphicon glyph="pencil" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="delete">Delete Activity</Tooltip>}
            placement="top">
            <Button onClick={this._handleActivityDelete}>
              <Glyphicon glyph="trash" />
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

module.exports = connect(mapStateToProps)(WorkoutViewPage);
