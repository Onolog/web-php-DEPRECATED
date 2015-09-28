var _ = require('underscore');
var React = require('react');

var ShoeSelector = require('./ShoeSelector.react');

var DateTimePicker = require('../../components/DateTimePicker/DateTimePicker.react');
var DurationInput = require('../../components/Forms/DurationInput.react');
var FBFriendTokenizer = require('../../components/Facebook/FBFriendTokenizer.react');
var FormGroup = require('../../components/Forms/FormGroup.react');
var HiddenInput = require('../../components/Forms/HiddenInput.react');
var Textarea = require('../../components/Forms/Textarea.react');
var TextInput = require('../../components/Forms/TextInput.react');

var cakePHP = require('../../utils/cakePHP');
var calculatePace = require('../../utils/calculatePace');
var dateToUnixTime = require('../../utils/dateToUnixTime');
var getLocalTimeString = require('../../utils/getLocalTimeString');
var unixTimeToDate = require('../../utils/unixTimeToDate');

var FORM_NAME = 'Workout';

function encodeName(name) {
  return cakePHP.encodeFormFieldName(name, FORM_NAME);
}

/**
 * WorkoutFields.react
 * @jsx React.DOM
 *
 * Displays a form with inputs for adding or editing a workout
 */
var WorkoutFields = React.createClass({
  displayName: 'WorkoutFields',

  propTypes: {
    /**
     * An existing workout object.
     */
    workout: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      workout: {}
    };
  },

  getInitialState: function() {
    var workout = this.props.workout;
    workout.date = workout.date || dateToUnixTime(new Date());

    return {
      pace: this._getPace(workout),
      workout: workout
    };
  },

  componentDidMount: function() {
    // Auto-focus the first field
    this.refs.distance.focus();
  },

  render: function() {
    var workout = this.state.workout;
    var date = unixTimeToDate(workout.date);

    return (
      <div className="form-horizontal workoutForm">
        <FormGroup label="Distance">
          <TextInput
            className="distanceInput"
            defaultValue={workout.distance}
            name={encodeName('distance')}
            onChange={this._onChange}
            ref="distance"
          />
          <span className="colon">miles</span>
        </FormGroup>

        <FormGroup label="Time" className="time">
          <DurationInput
            className="timeInput"
            duration={workout.time}
            name={encodeName('time')}
            onChange={this._onChange}
          />
      		<span className="colon">
      		  {this.state.pace} per mile
      		</span>
      	</FormGroup>

        <FormGroup label="Date">
          <DateTimePicker
            defaultValue={date}
            name={encodeName('date')}
            onChange={this._onDateChange}
          />
          <HiddenInput
            name={encodeName('start_date')}
            value={date.toISOString()}
          />
          <HiddenInput
            name={encodeName('start_date_local')}
            value={getLocalTimeString(date)}
          />
        </FormGroup>

        <FormGroup label="Avg. Heart Rate">
          <TextInput
            className="heartRateInput"
            defaultValue={workout.avg_hr}
            maxLength={3}
            name={encodeName('avg_hr')}
            onChange={this._onChange}
          />
          <span className="colon">bpm</span>
        </FormGroup>

        <FormGroup label="Shoes">
          <ShoeSelector
            defaultValue={workout.shoe_id}
            name={encodeName('shoe_id')}
            onChange={this._onChange}
          />
        </FormGroup>

        <FormGroup label="Friends">
          <FBFriendTokenizer
            friends={workout.friends}
            name={encodeName('friends')}
            onChange={this._onChange}
          />
        </FormGroup>

        <FormGroup label="Notes">
          <Textarea
            className="notes"
            defaultValue={workout.notes}
            name={encodeName('notes')}
            onChange={this._onChange}
            placeholder="Add some details about your activity..."
            rows="6"
          />
        </FormGroup>
      </div>
    );
  },

  _onChange: function(event) {
    var field = cakePHP.decodeFormFieldName(event.target.name);
    var value = event.target.value;

    var workout = _.extend({}, this.state.workout);
    workout[field] = value;

    // If the date has changed, update the related fields as well.
    if (field === 'date') {
      var date = unixTimeToDate(value);
      workout.start_date = date.toISOString();
      workout.start_date_local = getLocalTimeString(date);
    }

    this.setState({
      pace: this._getPace(workout),
      workout: workout
    });

    this.props.onChange && this.props.onChange(workout);
  },

  _onDateChange: function(/*Date*/ date) {
    this._onChange({
      target: {
        name: encodeName('date'),
        value: dateToUnixTime(date)
      }
    });
  },

  _getPace: function(/*object*/ workout) /*string*/ {
    return calculatePace.fromSeconds(
      workout.distance || 0,
      workout.time || 0
    );
  }

});

module.exports = WorkoutFields;
