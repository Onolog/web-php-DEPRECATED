var React = require('react');
var {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Tooltip,
} = require('react-bootstrap/lib');

var AppPage = require('components/Page/AppPage.react');
var Activity = require('../Activities/Activity.react');
var Panel = require('components/Panel/Panel.react');

/**
 * WorkoutViewPage.react
 *
 * Displays the page header and view for a single workout.
 */
var WorkoutViewPage = React.createClass({
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
        <Panel footer={this._renderButtonGroup()} noPadding={true}>
          <Activity activity={workout} />
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
