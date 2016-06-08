import moment from 'moment';
import React, {PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import Loader from 'components/Loader/Loader.react';
import WorkoutFields from 'app/Workouts/WorkoutFields.react';

import {addActivity, updateActivity} from 'actions/activities';

import jstz from 'jstz';
import {isEqual, isInteger} from 'lodash';

/**
 * ActivityModal.react
 *
 * Edit an existing activity or create a new one.
 */
const ActivityModal = React.createClass({
  displayName: 'ActivityModal',

  propTypes: {
    initialActivity: PropTypes.object,
    /**
     * Date object for the given day
     */
    date: PropTypes.instanceOf(Date),
    onHide: PropTypes.func,
    show: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      date: new Date(),
    };
  },

  getInitialState() {
    return {
      activity: this.props.initialActivity || this._getNewActivity(),
      isLoading: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (!nextProps.show) {
      // Reset the modal if it's hidden.
      this.setState(this.getInitialState());
    }
  },

  render() {
    const {initialActivity} = this.props;
    const {activity, isLoading} = this.state;

    let primaryAction;
    let title;

    if (initialActivity) {
      primaryAction = 'Update Activity';
      title = 'Edit Activity';
    } else {
      primaryAction = 'Create Activity';
      title = 'Create A New Activity';
    }

    return (
      <Modal
        {...this.props}
        onExited={this._handleExited}
        onHide={this._handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && <Loader background full large />}
          <WorkoutFields
            onChange={this._handleChange}
            workout={activity}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isLoading}
            onClick={this._handleClose}>
            Cancel
          </Button>
          <Button
            bsStyle="primary"
            disabled={isLoading}
            onClick={this._handleSave}>
            {primaryAction}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  },

  _handleChange(/*object*/ activity) {
    this.setState({activity});
  },

  _handleClose() {
    var initialState = this.getInitialState();
    var hasChanges = !isEqual(initialState.activity, this.state.activity);
    var confirmed = hasChanges && confirm(
      'Are you sure you want to close the dialog? Your changes will not ' +
      'be saved'
    );

    if (!hasChanges || confirmed) {
      this.props.onHide && this.props.onHide();
    }
  },

  /**
   * Reset the form when the modal closes.
   */
  _handleExited(e) {
    this.setState(this.getInitialState());
  },

  _handleSave(e) {
    const {dispatch, initialActivity} = this.props;
    const {activity} = this.state;
    const {distance, avg_hr} = activity;

    // Client-side validation of form.
    // TODO: Better validation on server.
    if (!distance || isNaN(distance)) {
      alert('Please enter a valid distance.');
      return;
    }

    if (avg_hr && !isInteger(Number(avg_hr))) {
      alert('Please enter a valid heart rate.');
      return;
    }

    this.setState({isLoading: true});
    const action = initialActivity ? updateActivity : addActivity;
    dispatch(action(activity));
  },

  _getNewActivity() {
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
      timezone: jstz.determine().name(), // Guess the user's timezone
    };
  },
});

module.exports = connect()(ActivityModal);
