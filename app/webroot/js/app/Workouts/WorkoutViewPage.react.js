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
import AppPage from 'components/Page/AppPage.react';

/**
 * WorkoutViewPage.react
 *
 * Displays the page header and view for a single workout.
 */
const WorkoutViewPage = React.createClass({
  displayName: 'WorkoutViewPage',

  getInitialState: function() {
    var {viewer, workout} = window.app;
    return {
      viewer,
      workout,
    };
  },

  render: function() {
    var {workout} = this.state;
    return (
      <AppPage narrow>
        <Panel footer={this._renderButtonGroup()}>
          <Activity activity={workout} fill />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup: function() {
    var {workout} = this.state;

    if (this.state.viewer === workout.user_id) {
      return (
        <ButtonGroup>
          <OverlayTrigger
            overlay={<Tooltip id="edit">Edit Activity</Tooltip>}
            placement="top">
            <Button href={`/workouts/edit/${workout.id}`}>
              <Glyphicon glyph="pencil" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="delete">Delete Activity</Tooltip>}
            placement="top">
            <Button onClick={this._onWorkoutDelete}>
              <Glyphicon glyph="trash" />
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      );
    }
  },

  /**
   * TODO: Handle this better...
   */
  _onWorkoutDelete: function() {
    if (confirm('Are you sure you want to delete this shoe?')) {
      document.location = '/workouts/delete/' + this.state.workout.id;
    }
  },
});

module.exports = WorkoutViewPage;
