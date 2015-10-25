var _ = require('underscore');
var jstz = require('jstz');
var moment = require('moment');
var React = require('react');

var Button = require('components/Button/Button.react');
var Modal = require('components/Modal/Modal.react');
var WorkoutFields = require('app/Workouts/WorkoutFields.react');

var LayerMixin = require('mixins/LayerMixin.react');
var StoreMixin = require('mixins/StoreMixin.react');

var AlertStore = require('flux/stores/AlertStore');
var DialogStore = require('flux/stores/DialogStore');
var WorkoutActions = require('flux/actions/WorkoutActions');

var cakePHP = require('utils/cakePHP');
var dateToUnixTime = require('utils/dateToUnixTime');

var {NEW_ID} = require('constants/Workouts');

/**
 * WorkoutAddDialog.react
 * @jsx React.DOM
 *
 * Takes a trigger prop and renders a dialog for adding workouts when that
 * trigger is clicked.
 */
var WorkoutAddDialog = React.createClass({
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
      alert: null,
      hasEdits: false,
      isLoading: false,
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
      React.cloneElement(this.props.trigger, {
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
      hasEdits: false,
      isLoading: false,
      shown: !this.state.shown,
      workout: this._getNewWorkout()
    });
  },

  _onAddWorkoutClick: function(event) {
    this.setState({ isLoading: true });
    WorkoutActions.add(this.state.workout);
  },

  _onCancel: function() {
    var {hasEdits} = this.state;
    var confirmed = hasEdits && confirm(
      'Are you sure you want to close the dialog? Your changes will not ' +
      'be saved.'
    );

    if (!hasEdits || confirmed) {
      this._toggleModal();
    }
  },

  _onChange: function(/*object*/ workout) {
    this.setState({
      hasEdits: true,
      workout: workout
    });
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
      start_date: moment(date).format(),
      timezone: jstz.determine().name() // Guess the user's timezone
    };
  }

});

module.exports = WorkoutAddDialog;
