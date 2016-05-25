import {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
} from 'react-bootstrap';
import React from 'react';

import Activity from 'app/Activities/Activity.react';
import ActivityModal from 'app/Users/Home/ActivityModal.react';
import AppPage from 'components/Page/AppPage.react';
import UserStore from 'flux/stores/UserStore';
import WorkoutStore from 'flux/stores/WorkoutStore';

import getIdFromPath from 'utils/getIdFromPath';

import {CHANGE} from 'flux/ActionTypes';

/**
 * WorkoutViewPage.react
 *
 * Displays the page header and view for a single workout.
 */
const WorkoutViewPage = React.createClass({
  displayName: 'WorkoutViewPage',

  getInitialState() {
    return {
      showModal: false,
      workout: WorkoutStore.getSingle(getIdFromPath()),
    };
  },

  componentDidMount() {
    WorkoutStore.bind(CHANGE, this._handleWorkoutChange);
  },

  componentWillUnmount() {
    WorkoutStore.unbind(CHANGE, this._handleWorkoutChange);
  },

  _handleWorkoutChange() {
    this.setState({
      showModal: false,
      workout: WorkoutStore.getSingle(getIdFromPath()),
    });
  },

  render() {
    return (
      <AppPage narrow>
        <Panel footer={this._renderButtonGroup()}>
          <Activity activity={this.state.workout} fill />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup() {
    const {showModal, workout} = this.state;

    if (UserStore.getUserId() === workout.user_id) {
      return (
        <ButtonGroup>
          <OverlayTrigger
            overlay={<Tooltip id="edit">Edit Activity</Tooltip>}
            placement="top">
            <Button onClick={this._handleWorkoutEdit}>
              <Glyphicon glyph="pencil" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="delete">Delete Activity</Tooltip>}
            placement="top">
            <Button onClick={this._handleWorkoutDelete}>
              <Glyphicon glyph="trash" />
            </Button>
          </OverlayTrigger>
          <ActivityModal
            initialActivity={workout}
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
  _handleWorkoutDelete() {
    if (confirm('Are you sure you want to delete this shoe?')) {
      document.location = '/workouts/delete/' + this.state.workout.id;
    }
  },

  _handleWorkoutEdit() {
    this.setState({showModal: true});
  },
});

module.exports = WorkoutViewPage;
