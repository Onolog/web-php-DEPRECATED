var React = require('react');

var AppPage = require('../../components/Page/AppPage.react');
var Activity = require('../Activities/Activity.react');
var Button = require('../../components/Button/Button.react');
var ButtonGroup = require('../../components/ButtonGroup/ButtonGroup.react');
var PageHeader = require('../../components/Page/PageHeader.react');
var Panel = require('../../components/Panel/Panel.react');

/**
 * WorkoutViewPage.react
 * @jsx React.DOM
 *
 * Displays the page header and view for a single workout.
 */
var WorkoutViewPage = React.createClass({
  displayName: 'WorkoutViewPage',

  getInitialState: function() {
    var {viewer, workout} = window.app;
    return {
      viewer: viewer,
      workout: workout
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
          <Button
            glyph="pencil"
            href={'/workouts/edit/' + workout.id}
            onClick={this._onWorkoutEdit}
            tooltip={{
              title: 'Edit Activity'
            }}
          />
          <Button
            glyph="trash"
            onClick={this._onWorkoutDelete}
            tooltip={{
              title: 'Delete Activity'
            }}
          />
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
  }
});

module.exports = WorkoutViewPage;
