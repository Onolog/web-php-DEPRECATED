/**
 * WorkoutAddButton.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Workouts/WorkoutFields.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Modal/Modal.react',

  'actions/WorkoutActions',
  'constants/ActionTypes',
  'constants/Workouts',

  'mixins/LayerMixin.react',
  'mixins/StoreMixin.react',

  'stores/AlertStore',
  'stores/DialogStore',
  'stores/WorkoutStore',

  'utils/cakePHP',
  'utils/DateTimeUtils',
  'lib/jquery/jquery.min'

], function(

  React,
  WorkoutFields,
  Button,
  Modal,
  WorkoutActions,
  ActionTypes,
  Workouts,

  LayerMixin,
  StoreMixin,

  AlertStore,
  DialogStore,
  WorkoutStore,

  cakePHP,
  DateTimeUtils

) {

  var NEW_ID = Workouts.NEW_ID;

  return React.createClass({
    displayName: 'WorkoutAddButton',

    mixins: [LayerMixin, StoreMixin],

    propTypes: {
      /**
       * Date object for the given day
       */
      dateObject: React.PropTypes.instanceOf(Date).isRequired,
    },

    getInitialState: function() {
      return {
        isLoading: false,
        alert: null,
        shown: false,
        workoutData: this._getNewWorkout()
      };
    },

    componentWillMount: function() {
      this.stores = [
        this.setStoreInfo(AlertStore, this._alertChanged),
        this.setStoreInfo(DialogStore, this._dialogChanged),
        this.setStoreInfo(WorkoutStore, this._workoutChanged)
      ];
    },

    _alertChanged: function() {
      this.setState({
        alert: {
          message: AlertStore.getAlertMessage(),
          type: AlertStore.getAlertType()
        },
        isLoading: false
      });
    },

    _dialogChanged: function() {
      // TODO: Find some way to check which dialog this is, since we're
      // in global scope here.
      this.setState({
        shown: DialogStore.getIsShown()
      });
    },

    _workoutChanged: function() {
      var workout = WorkoutStore.getWorkout();
      if (workout && workout.id === NEW_ID) {
        this.setState({
          workoutData: workout
        });
      }
    },

    render: function() {
      return (
        <Button
          glyph="plus"
          className="add"
          use="default"
          size="xsmall"
          tooltip={{
            title: 'Add workout',
            placement: 'right'
          }}
          onClick={this._toggleModal}
        />
      );
    },

    renderLayer: function() {
      return (
        <Modal
          shown={this.state.shown}
          onRequestClose={this._onCancel}
          isLoading={this.state.isLoading}
          alert={this.state.alert}
          title="New Activity"
          footer={
            <div>
              <Button
                label="Cancel"
                disabled={this.state.isLoading}
                onClick={this._onCancel}
              />
              <Button
                label="Add Workout"
                use="primary"
                disabled={this.state.isLoading}
                onClick={this._onAddWorkoutClick}
              />
            </div>
          }>
          <WorkoutFields workout={this.state.workoutData} />
        </Modal>
      );
    },

    _toggleModal: function() {
      this.setState({
        alert: null,
        shown: !this.state.shown,
        isLoading: false,
        workoutData: this._getNewWorkout()
      });
    },

    _onAddWorkoutClick: function(event) {
      this.setState({ isLoading: true });
      WorkoutActions.add(this.state.workoutData);
    },

    _onCancel: function() {
      var hasEdits = WorkoutStore.getHasEdits();
      if (
        !hasEdits ||
        (hasEdits && confirm(
          'Are you sure you want to close the dialog? Your workout will not ' +
          'be saved'
        ))
      ) {
        this._toggleModal();
        WorkoutActions.cancel();
      }
    },

    _getNewWorkout: function() {
      return {
        // TODO: Make sure this doesn't conflict with datepicker in
        // workout fields.
        date: this.props.dateObject.getTime() / 1000,
        id: NEW_ID
      };
    }

  });

});