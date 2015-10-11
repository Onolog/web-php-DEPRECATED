var _ = require('underscore');
var moment = require('moment');
var React = require('react');

var ShoeSelector = require('./ShoeSelector.react');

var DateTimePicker = require('../../components/DateTimePicker/DateTimePicker.react');
var DurationInput = require('../../components/Forms/DurationInput.react');
var FBFriendTokenizer = require('../../components/Facebook/FBFriendTokenizer.react');
var FormGroup = require('../../components/Forms/FormGroup.react');
var Textarea = require('../../components/Forms/Textarea.react');
var TextInput = require('../../components/Forms/TextInput.react');

var cakePHP = require('../../utils/cakePHP');
var calculatePace = require('../../utils/calculatePace');
var dateToUnixTime = require('../../utils/dateToUnixTime');

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
    var {workout} = this.props;
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
    var {workout} = this.state;

    // TODO: This conversion should no longer be necessary after `workout.date`
    // is converted to a date string instead of a Unix timestamp.
    var date =
      // workout.start_date ||
      (workout.date && workout.date * 1000);

    return (
      <div className="form-horizontal workoutForm">
        <FormGroup label="Distance">
          <TextInput
            className="distanceInput"
            defaultValue={workout.distance}
            name={encodeName('distance')}
            onChange={this._onInputChange}
            ref="distance"
          />
          <span className="colon">miles</span>
        </FormGroup>

        <FormGroup label="Time" className="time">
          <DurationInput
            className="timeInput"
            duration={workout.time}
            name={encodeName('time')}
            onChange={this._onInputChange}
          />
      		<span className="colon">
      		  {this.state.pace} per mile
      		</span>
      	</FormGroup>

        <FormGroup label="Date">
          <DateTimePicker
            date={date}
            onChange={this._onDateChange}
            timezone={workout.timezone}
          />
        </FormGroup>

        <FormGroup label="Avg. Heart Rate">
          <TextInput
            className="heartRateInput"
            defaultValue={workout.avg_hr}
            maxLength={3}
            name={encodeName('avg_hr')}
            onChange={this._onInputChange}
          />
          <span className="colon">bpm</span>
        </FormGroup>

        <FormGroup label="Shoes">
          <ShoeSelector
            defaultValue={workout.shoe_id}
            name={encodeName('shoe_id')}
            onChange={this._onInputChange}
          />
        </FormGroup>

        <FormGroup label="Friends">
          <FBFriendTokenizer
            friends={workout.friends}
            name={encodeName('friends')}
            onChange={this._onInputChange}
          />
        </FormGroup>

        <FormGroup label="Notes">
          <Textarea
            className="notes"
            defaultValue={workout.notes}
            name={encodeName('notes')}
            onChange={this._onInputChange}
            placeholder="Add some details about your activity..."
            rows="6"
          />
        </FormGroup>
      </div>
    );
  },

  _onInputChange: function(e) {
    var field = cakePHP.decodeFormFieldName(e.target.name);
    var value = e.target.value;
    var workout = _.extend({}, this.state.workout);
    workout[field] = value;

    this._onChange(workout);
  },

  _onDateChange: function(/*string*/ dateString, /*string*/ timezone) {
    var date = moment(dateString);
    var workout = _.extend({}, this.state.workout, {
      date: date.unix(),
      start_date: dateString,
      timezone: timezone
    });

    this._onChange(workout);
  },

  _onChange: function(/*object*/ workout) {
    this.setState({
      pace: this._getPace(workout),
      workout: workout
    });

    this.props.onChange && this.props.onChange(workout);
  },

  _getPace: function(/*object*/ workout) /*string*/ {
    return calculatePace.fromSeconds(
      workout.distance || 0,
      workout.time || 0
    );
  }

});

module.exports = WorkoutFields;
