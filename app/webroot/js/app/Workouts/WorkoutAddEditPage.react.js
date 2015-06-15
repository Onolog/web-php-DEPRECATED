/**
 * WorkoutAddEditPage.react
 * @jsx React.DOM
 *
 * Permalink page for adding new workouts or editing existing ones.
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
    displayName: 'WorkoutAddEditPage',

    propTypes: {
      isEditing: React.PropTypes.bool,
      /**
       * An array of all the user's shoes
       */
      shoes: React.PropTypes.array,
      /**
       * If editing, the existing workout object
       */
      workout: React.PropTypes.object
    },

    getDefaultProps: function() {
      return {
        isEditing: false
      };
    },

    getInitialState: function() {
      var workout = this.props.workout;
      var date = (workout && workout.date) || dateToUnixTime(new Date());

      return {
        isSaving: false,
        workout: workout || {date: date}
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
        workout: workout
      });
    },

    render: function() {
      var date = this.state.workout.date;

      return (
        <div>
          <PageHeader title={this._getTitle()} />
          <Panel footer={this._renderFooter()}>
            <form action={this._getFormAction()} method="POST" ref="form">
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

    _getFormAction: function() {
      var isEditing = this.props.isEditing;
      var workout = this.state.workout;
      return [
        '/workouts',
        isEditing ? 'edit' : 'add',
        isEditing ? workout.id : workout.date
      ].join('/');
    },

    _getTitle: function() {
      return this.props.isEditing ? 'Edit Activity' : 'New Activity';
    },

    _renderFooter: function() {
      var submitLabel =
        this.props.isEditing ? 'Update Activity' : 'Add Activity';

      return (
        <div className="pull-right">
          <Button
            disabled={this.state.isSaving}
            label="Cancel"
            onClick={this._onCancel}
          />
          <Button
            disabled={this.state.isSaving}
            label={submitLabel}
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
