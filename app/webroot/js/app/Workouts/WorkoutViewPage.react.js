/**
 * WorkoutViewPage.react
 * @jsx React.DOM
 *
 * Displays the page header and view for a single workout.
 */

define([

  'lib/react/react',
  'lib/react/jsx!app/Activities/Activity.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'utils/DateTimeUtils'

], function(

  React,
  Activity,
  Button,
  ButtonGroup,
  Panel,
  DateTimeUtils

) {

  return React.createClass({
    displayName: 'WorkoutViewPage',

    propTypes: {
      /**
       * ID of the person viewing the page
       */
      viewer: React.PropTypes.number.isRequired,
      workout: React.PropTypes.object.isRequired
    },

    render: function() {
      var workout = this.props.workout;
      return (
        <Panel footer={this._renderButtonGroup()} noPadding={true}>
          <Activity activity={workout} />
        </Panel>
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

      if (this.props.viewer === workout.user_id) {
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
