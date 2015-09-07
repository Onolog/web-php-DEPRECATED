define([

  'lib/react/react',
  'lib/react/jsx!app/Workouts/WorkoutFields.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Modal/Modal.react',
  'actions/WorkoutActions',
  'constants/Workouts',
  'mixins/LayerMixin.react',
  'mixins/StoreMixin.react',
  'stores/AlertStore',
  'stores/DialogStore',
  'utils/cakePHP',
  'utils/DateTimeUtils',
  'utils/dateToUnixTime',
  'lib/underscore/underscore'

], function(

  React,
  WorkoutFields,
  Button,
  Modal,
  WorkoutActions,
  WORKOUTS,
  LayerMixin,
  StoreMixin,
  AlertStore,
  DialogStore,
  cakePHP,
  DateTimeUtils,
  dateToUnixTime

) {

  var NEW_ID = WORKOUTS.NEW_ID;

  /**
   * WorkoutAddDialog.react
   * @jsx React.DOM
   *
   * Takes a trigger prop and renders a dialog for adding workouts when that
   * trigger is clicked.
   */
  return React.createClass({
    displayName: 'WorkoutAddDialog',

    mixins: [LayerMixin, StoreMixin],

    propTypes: {
      /**
       * Date object for the given day
       */
      date: React.PropTypes.instanceOf(Date).isRequired,
      trigger: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        isLoading: false,
        alert: null,
        shown: false,
        workout: this._getNewWorkout()
      };
    },

    componentWillMount: function() {
      this.stores = [
        this.setStoreInfo(AlertStore, this._alertChanged),
        this.setStoreInfo(DialogStore, this._dialogChanged)
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
      this.setState({shown: DialogStore.getIsShown()});
    },

    render: function() {
      return (
        React.addons.cloneWithProps(this.props.trigger, {
          onClick: this._toggleModal
        })
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
                label="Add Activity"
                use="primary"
                disabled={this.state.isLoading}
                onClick={this._onAddWorkoutClick}
              />
            </div>
          }>
          <WorkoutFields
            onChange={this._onChange}
            workout={this._getNewWorkout()}
          />
        </Modal>
      );
    },

    _toggleModal: function() {
      this.setState({
        alert: null,
        shown: !this.state.shown,
        isLoading: false,
        workout: this._getNewWorkout()
      });
    },

    _onAddWorkoutClick: function(event) {
      this.setState({ isLoading: true });
      WorkoutActions.add(this.state.workout);
    },

    _onCancel: function() {
      var hasEdits = !_.isEqual(this._getNewWorkout(), this.state.workout);
      var confirmed = hasEdits && confirm(
        'Are you sure you want to close the dialog? Your changes will not ' +
        'be saved.'
      );

      if (!hasEdits || confirmed) {
        this._toggleModal();
      }
    },

    _onChange: function(/*object*/ workout) {
      this.setState({workout: workout});
    },

    _getNewWorkout: function() {
      var date = this.props.date;
      var now = new Date();

      // Set time to match the current time.
      date.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );

      return {
        date: dateToUnixTime(this.props.date),
        id: NEW_ID
      };
    }

  });

});