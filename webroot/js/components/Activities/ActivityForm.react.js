import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {FormControl} from 'react-bootstrap';

import ShoeSelector from 'components/Shoes/ShoeSelector.react';

import AppForm from 'components/Forms/AppForm.react';
import DateTimePicker from 'components/DateTimePicker/DateTimePicker.react';
import DurationInput from 'components/Forms/DurationInput.react';
import FBFriendTokenizer from 'components/Facebook/FBFriendTokenizer.react';
import FormGroup from 'components/Forms/FormGroup.react';

import calculatePace from 'utils/calculatePace';

import './css/ActivityForm.css';

/**
 * ActivityForm.react
 *
 * Displays a form with inputs for adding or editing an activity.
 */
const ActivityForm = React.createClass({
  displayName: 'ActivityForm',

  propTypes: {
    /**
     * An existing activity object.
     */
    activity: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      activity: {},
    };
  },

  componentDidMount() {
    // Auto-focus the distance field
    findDOMNode(this._distanceInput).focus();
  },

  render() {
    const {activity} = this.props;
    const pace = calculatePace.fromSeconds(
      activity.distance || 0,
      activity.duration || 0
    );

    return (
      <AppForm bordered className="activity-form" horizontal>
        <FormGroup label="Distance">
          <FormControl
            className="distanceInput"
            defaultValue={activity.distance}
            name="distance"
            onChange={this._onInputChange}
            ref={input => this._distanceInput = input}
            type="number"
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
          <FormControl
            className="heartRateInput"
            defaultValue={activity.avg_hr}
            maxLength={3}
            name="avg_hr"
            onChange={this._onInputChange}
            type="text"
          />
          <span className="colon">bpm</span>
        </FormGroup>

        <FormGroup label="Shoes">
          <ShoeSelector
            name="shoe_id"
            onChange={this._onInputChange}
            value={activity.shoe_id}
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
          <FormControl
            className="notes"
            componentClass="textarea"
            defaultValue={activity.notes}
            name="notes"
            onChange={this._onInputChange}
            placeholder="Add some details about your activity..."
            rows="6"
          />
        </FormGroup>
      </AppForm>
    );
  },

  _onInputChange(e) {
    const {name, value} = e.target;
    const activity = {...this.props.activity};
    activity[name] = value;

    this._onChange(activity);
  },

  _onDateChange(/*string*/ start_date, /*string*/ timezone) {
    const activity = {
      ...this.props.activity,
      start_date,
      timezone,
    };

    this._onChange(activity);
  },

  _onChange(/*object*/ activity) {
    this.props.onChange(activity);
  },
});

export default ActivityForm;
