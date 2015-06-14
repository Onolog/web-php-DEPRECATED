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
  'lib/react/jsx!components/Loader/Loader.react',
  'lib/react/jsx!components/Page/PageHeader.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'actions/WorkoutActions',
  'constants/ActionTypes',
  'stores/WorkoutStore',
  'utils/cx',
  'utils/dateToUnixTime'

], function(

  React,
  WorkoutFields,
  Button,
  LeftRight,
  Loader,
  PageHeader,
  Panel,
  WorkoutActions,
  ActionTypes,
  WorkoutStore,
  cx,
  dateToUnixTime

) {

  return React.createClass({
    displayName: 'WorkoutPermalink',

    propTypes: {
      /**
       * Unix timestamp.
       *
       * Note: A date is required for the "add" action.
       */
      date: React.PropTypes.number,
      /**
       * The selected shoe in an existing workout, if one has been selected.
       */
      selectedShoe: React.PropTypes.number,
      /**
       * An array of all the user's shoes
       */
      shoes: React.PropTypes.array,
    },

    getInitialState: function() {
      var date = this.props.date || dateToUnixTime(new Date());
      return {
        date: date,
        isSaving: false,
        workout: {
          date: date
        }
      };
    },

    componentDidMount: function() {
      WorkoutStore.bind(ActionTypes.CHANGE, this._workoutChanged);
    },

    componentWillUnmount: function() {
      WorkoutStore.unbind(ActionTypes.CHANGE, this._workoutChanged);
    },

    _workoutChanged: function() {
      var workout = WorkoutStore.getWorkout();
      this.setState({
        date: workout.date,
        workout: workout
      });
    },

    render: function() {
      var date = this.state.date;
      return (
        <div>
          <PageHeader title="New Activity" />
          <Panel footer={this._renderFooter()}>
            <form
              action={'/workouts/add/' + date}
              method="POST"
              ref="form">
              <WorkoutFields
                {...this.props}
                date={date}
              />
            </form>
            <Loader
              background={true}
              className={cx({
                'hidden': !this.state.isSaving
              })}
              full={true}
            />
          </Panel>
        </div>
      );
    },

    _renderFooter: function() {
      return (
        <div className="pull-right">
          <Button
            disabled={this.state.isSaving}
            label="Cancel"
            onClick={this._onCancel}
          />
          <Button
            disabled={this.state.isSaving}
            label="Add Workout"
            onClick={this._onSubmit}
            type="submit"
            use="primary"
          />
        </div>
      );
    },

    _onCancel: function() {
      document.location = '/';
    },

    _onSubmit: function() {
      this.setState({isSaving: true});

      // Submit the form via /workouts/add
      this.refs.form.getDOMNode().submit();
    }

  });

});
