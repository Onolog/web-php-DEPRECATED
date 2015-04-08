/**
 * WorkoutAddPermalink.react
 * @jsx React.DOM
 *
 * Permalink for adding new workouts
 */

define([

  'lib/react/react',
  'lib/react/jsx!app/Workouts/WorkoutFields.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'lib/react/jsx!components/Panel/Panel.react',

], function(

  React,
  WorkoutFields,
  Button,
  LeftRight,
  Panel

) {

  return React.createClass({
    displayName: 'WorkoutPermalink',

    propTypes: {
      /**
       * Unix timestamp.
       *
       * Note: A date is required for the "add" action.
       */
      date: React.PropTypes.number.isRequired,
      friends: React.PropTypes.array,
      /**
       * The selected shoe in an existing workout, if one has been selected.
       */
      selectedShoe: React.PropTypes.number,
      /**
       * An array of all the user's shoes
       */
      shoes: React.PropTypes.array,
    },

    render: function() {
      return (
        <Panel footer={this._renderFooter()}>
          <form
            action={'/workouts/add/' + this.props.date}
            method="post">
            <WorkoutFields {...this.props} />
          </form>
        </Panel>
      );
    },

    _renderFooter: function() {
      return (
        <div className="pull-right">
          <Button
            label="Cancel"
            onClick={this._onCancel}
          />
          <Button
            label="Add Workout"
            use="primary"
            type="submit"
            onClick={this._onSubmit}
          />
        </div>
      );
    },

    _onCancel: function() {
    
    },

    _onSubmit: function() {
    
    }

  });

});
