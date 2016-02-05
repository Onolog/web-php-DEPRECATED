import moment from 'moment';
import React from 'react';
import {Button, Modal} from 'react-bootstrap/lib';

import Loader from 'components/Loader/Loader.react';
import WorkoutFields from 'app/Workouts/WorkoutFields.react';
import WorkoutActions from 'flux/actions/WorkoutActions';

import dateToUnixTime from 'utils/dateToUnixTime';
import jstz from 'jstz';
import {isEqual} from 'lodash';

import {NEW_ID} from 'constants/Workouts';

/**
 * ActivityModal.react
 *
 * Edit an existing activity or create a new one.
 */
const ActivityModal = React.createClass({
  displayName: 'ActivityModal',

  propTypes: {
    initialActivity: React.PropTypes.object,
    /**
     * Date object for the given day
     */
    date: React.PropTypes.instanceOf(Date),
    onHide: React.PropTypes.func,
    show: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      date: new Date()
    };
  },

  getInitialState: function() {
    return {
      activity: this.props.initialActivity || this._getNewActivity(),
      isLoading: false,
    };
  },

  render: function() {
    const {initialActivity} = this.props;
    const {activity, isLoading} = this.state;

    let primaryAction;
    let title;

    if (initialActivity) {
      primaryAction = 'Update Activity';
      title = 'Edit Activity';
    } else {
      primaryAction = 'Create Shoe';
      title = 'Create A New Activity';
    }

    return (
      <Modal
        {...this.props}
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

  _handleChange: function(/*object*/ activity) {
    this.setState({activity});
  },

  _handleClose: function() {
    var initialState = this.getInitialState();
    var hasChanges = !isEqual(initialState.activity, this.state.activity);
    var confirmed = hasChanges && confirm(
      'Are you sure you want to close the dialog? Your changes will not ' +
      'be saved'
    );

    if (!hasChanges || confirmed) {
      this.setState(initialState);
      this.props.onHide && this.props.onHide();
    }
  },

  _handleSave: function(e) {
    this.setState({isLoading: true});
    this.props.initialActivity ?
      WorkoutActions.save(this.state.activity) :
      WorkoutActions.add(this.state.activity);

  },

  _getNewActivity: function() {
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

module.exports = ActivityModal;
