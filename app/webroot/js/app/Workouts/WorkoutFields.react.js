var moment = require('moment');
var React = require('react');

var ShoeSelector = require('./ShoeSelector.react');

var DateTimePicker = require('components/DateTimePicker/DateTimePicker.react');
var DurationInput = require('components/Forms/DurationInput.react');
var FBFriendTokenizer = require('components/Facebook/FBFriendTokenizer.react');
var FormGroup = require('components/Forms/FormGroup.react');
var Textarea = require('components/Forms/Textarea.react');
var TextInput = require('components/Forms/TextInput.react');

var calculatePace = require('utils/calculatePace');

/**
 * WorkoutFields.react
 *
 * Displays a form with inputs for adding or editing a workout
 */
var WorkoutFields = React.createClass({
  displayName: 'WorkoutFields',

  propTypes: {
    /**
     * An existing workout object.
     */
    workout: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      workout: {},
    };
  },

  getInitialState: function() {
    return {
      workout: this.props.workout,
    };
  },

  componentDidMount: function() {
    // Auto-focus the first field
    this.refs.distance.focus();
  },

  render: function() {
    var {workout} = this.state;
    var pace = calculatePace.fromSeconds(
      workout.distance || 0,
      workout.duration || 0
    );

    return (
      <div className="form-horizontal workoutForm">
        <FormGroup label="Distance">
          <TextInput
            className="distanceInput"
            defaultValue={workout.distance}
            name="distance"
            onChange={this._onInputChange}
            ref="distance"
          />
          <span className="colon">miles</span>
        </FormGroup>

        <FormGroup label="Duration" className="time">
          <DurationInput
            className="timeInput"
            duration={workout.duration}
            name="duration"
            onChange={this._onInputChange}
          />
          <span className="colon">
            {pace} per mile
          </span>
        </FormGroup>

        <FormGroup label="Date">
          <DateTimePicker
            date={workout.start_date}
            onChange={this._onDateChange}
            timezone={workout.timezone}
          />
        </FormGroup>

        <FormGroup label="Avg. Heart Rate">
          <TextInput
            className="heartRateInput"
            defaultValue={workout.avg_hr}
            maxLength={3}
            name="avg_hr"
            onChange={this._onInputChange}
          />
          <span className="colon">bpm</span>
        </FormGroup>

        <FormGroup label="Shoes">
          <ShoeSelector
            defaultValue={workout.shoe_id}
            name="shoe_id"
            onChange={this._onInputChange}
          />
        </FormGroup>

        <FormGroup label="Friends">
          <FBFriendTokenizer
            friends={workout.friends}
            name="friends"
            onChange={this._onInputChange}
          />
        </FormGroup>

        <FormGroup label="Notes">
          <Textarea
            className="notes"
            defaultValue={workout.notes}
            name="notes"
            onChange={this._onInputChange}
            placeholder="Add some details about your activity..."
            rows="6"
          />
        </FormGroup>
      </div>
    );
  },

  _onInputChange: function(e) {
    var {name, value} = e.target;
    var workout = Object.assign({}, this.state.workout);
    workout[name] = value;

    this._onChange(workout);
  },

  _onDateChange: function(/*string*/ dateString, /*string*/ timezone) {
    var date = moment(dateString);
    var workout = Object.assign({}, this.state.workout, {
      date: date.unix(),
      start_date: dateString,
      timezone: timezone,
    });

    this._onChange(workout);
  },

  _onChange: function(/*object*/ workout) {
    this.setState({workout: workout});
    this.props.onChange && this.props.onChange(workout);
  },
});

module.exports = WorkoutFields;
