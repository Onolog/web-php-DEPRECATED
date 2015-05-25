/**
 * WorkoutViewPage.react
 * @jsx React.DOM
 *
 * Displays the page header and view for a single workout.
 */

define([

  'lib/react/react',
  'lib/react/jsx!app/Chrome/PageHeader.react',
  'lib/react/jsx!app/Workouts/WorkoutView.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'utils/DateTimeUtils'

], function(

  React,
  PageHeader,
  WorkoutView,
  Button,
  ButtonGroup,
  Panel,
  DateTimeUtils

) {

  return React.createClass({
    displayName: 'WorkoutViewPage',

    propTypes: {
      /**
       * Whether or not the current viewer can edit or delete the workout.
       */
      canEdit: React.PropTypes.bool.isRequired,
      workout: React.PropTypes.object.isRequired
    },

    render: function() {
      var workout = this.props.workout;
      return (
        <div>
          <Panel
            title={DateTimeUtils.formatDate(workout.date * 1000)}
            footer={this._renderButtonGroup()}>
            <WorkoutView workout={workout} />
          </Panel>
        </div>
      );
    },

    _renderButtonGroup: function() {
      var workout = this.props.workout;

      // TODO: Make these work better, ideally as a dialog 
      var addButton =
        <Button
          glyph="plus"
          href="/workouts/add/"
          tooltip={{
            title: 'New Workout'
          }}
        />;

      var editButton =
        <Button
          glyph="pencil"
          href={'/workouts/edit/' + workout.id}
          tooltip={{
            title: 'Edit Workout'
          }}
        />;

      if (this.props.canEdit) {
        return (
          <ButtonGroup>
            <Button
              glyph="trash"
              onClick={this._onWorkoutDelete}
              tooltip={{
                title: 'Delete Workout'
              }}
            />
            <Button
              glyph="th"
              href="/"
              tooltip={{
                title: 'All Workouts'
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
        document.location = '/workouts/delete/' + this.props.workout.id;
      }
    }
  });

});
