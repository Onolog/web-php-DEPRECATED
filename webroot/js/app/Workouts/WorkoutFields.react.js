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

require('../../../css/app/Workout.css');

/**
 * WorkoutFields.react
 *
 * Displays a form with inputs for adding or editing a workout
 */
var WorkoutFields = React.createClass({
  displayName: 'WorkoutFields',

  propTypes: {
    /**
     * An existing activity object.
     */
    activity: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      activity: {},
    };
  },

  getInitialState: function() {
    return {
      activity: this.props.activity,
    };
  },

  componentDidMount: function() {
    // Auto-focus the first field
    this.refs.distance.focus();
  },

  render: function() {
    var {activity} = this.state;
    var pace = calculatePace.fromSeconds(
      activity.distance || 0,
      activity.duration || 0
    );

    return (
      <div className="form-horizontal activity-form">
        <FormGroup label="Distance">
          <TextInput
            className="distanceInput"
            defaultValue={activity.distance}
            name="distance"
            onChange={this._onInputChange}
            ref="distance"
          />
          <span className="colon">miles</span>
        </FormGroup>

        <FormGroup className="time" label="Duration">
          <DurationInput
            className="timeInput"
            duration={activity.duration}
            name="duration"
            onChange={this._onInputChange}
          />
          <span className="colon">
            {pace} per mile
          </span>
        </FormGroup>

        <FormGroup label="Date">
          <DateTimePicker
            date={activity.start_date}
            onChange={this._onDateChange}
            timezone={activity.timezone}
          />
        </FormGroup>

        <FormGroup label="Avg. Heart Rate">
          <TextInput
            className="heartRateInput"
            defaultValue={activity.avg_hr}
            maxLength={3}
            name="avg_hr"
            onChange={this._onInputChange}
          />
          <span className="colon">bpm</span>
        </FormGroup>

        <FormGroup label="Shoes">
          <ShoeSelector
            defaultValue={activity.shoe_id}
            name="shoe_id"
            onChange={this._onInputChange}
          />
        </FormGroup>

        <FormGroup label="Friends">
          <FBFriendTokenizer
            friends={activity.friends}
            name="friends"
            onChange={this._onInputChange}
          />
        </FormGroup>

        <FormGroup label="Notes">
          <Textarea
            className="notes"
            defaultValue={activity.notes}
            name="notes"
            onChange={this._onInputChange}
            placeholder="Add some details about your activity..."
            rows="6"
          />
        </FormGroup>
      </div>
    );
  },

  _onInputChange(e) {
    const {name, value} = e.target;
    const activity = {...this.state.activity};
    activity[name] = value;

    this._onChange(activity);
  },

  _onDateChange(/*string*/ dateString, /*string*/ timezone) {
    const date = moment(dateString);
    const activity = {
      ...this.state.activity,
      date: date.unix(),
      start_date: dateString,
      timezone,
    };

    this._onChange(activity);
  },

  _onChange(/*object*/ activity) {
    this.setState({activity});
    this.props.onChange && this.props.onChange(activity);
  },
});

module.exports = WorkoutFields;
