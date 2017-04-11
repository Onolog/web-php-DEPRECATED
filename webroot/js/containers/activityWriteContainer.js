import jstz from 'jstz';
import {isEmpty, isEqual, isInteger} from 'lodash';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {addActivity, deleteActivity, updateActivity} from 'actions/activities';
import {hideActivityModal} from 'actions/navigation';
import garminUrlToActivity from 'utils/garmin/garminUrlToActivity';

const mapStateToProps = ({garminData, pendingRequests}) => {
  return {
    garminData,
    pendingRequests,
  };
};

const FIELDS = {
  distance: {
    error: 'Please enter a valid distance greater than 0.',
    isValid: (value) => !!Number(value),
  },
  'avg_hr': {
    error: 'Please enter a valid heart rate.',
    isValid: (value) => !value || isInteger(Number(value)),
  },
};

/**
 * ActivityWriteContainer
 *
 * Abstracts functionality for creating, editing, or deleting an activity.
 */
const activityModalContainer = Component => {
  const WrappedComponent = React.createClass({
    propTypes: {
      initialActivity: PropTypes.object,
      /**
       * Date object for the given day
       */
      date: PropTypes.instanceOf(Date),
      onHide: PropTypes.func,
      show: PropTypes.bool,
    },

    getInitialState() {
      return {
        activity: this.props.initialActivity || this._getNewActivity(),
        errors: {},
        isLoading: false,
      };
    },

    componentWillReceiveProps(nextProps) {
      const {garminData, show} = nextProps;

      if (!isEmpty(garminData)) {
        this.setState({activity: garminUrlToActivity(garminData)});
      }
    },

    render() {
      const {initialActivity, ...otherProps} = this.props;
      return (
        <Component
          {...otherProps}
          {...this.state}
          isEditing={!!initialActivity}
          onChange={this._handleChange}
          onDelete={this._handleDelete}
          onExited={this._handleExited}
          onHide={this._handleHide}
          onSave={this._handleSave}
        />
      );
    },

    _handleChange(/*object*/ activity) {
      this.setState({activity});
    },

    _handleDelete() {
      const {initialActivity, dispatch} = this.props;
      if (confirm('Are you sure you want to delete this activity?')) {
        this.setState({isLoading: true});
        dispatch(deleteActivity(initialActivity.id));
      }
    },

    _handleHide() {
      // TODO: Find a better way to compare states to see whether there are
      // changes.
      const {activity} = this.getInitialState();
      const hasChanges = !isEqual(activity, this.state.activity);
      const confirmed = hasChanges && confirm(
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
      this.props.dispatch(hideActivityModal());
      this.setState(this.getInitialState());
    },

    _handleSave(e) {
      const {dispatch, initialActivity} = this.props;
      const {activity} = this.state;

      const errors = {};
      Object.keys(FIELDS).forEach(name => {
        const field = FIELDS[name];
        if (!field.isValid(activity[name])) {
          errors[name] = field.error;
        }
      });

      if (!isEmpty(errors)) {
        this.setState({errors});
        return;
      }

      this.setState({isLoading: true});
      const action = initialActivity ? updateActivity : addActivity;
      dispatch(action(activity));
    },

    _getNewActivity() {
      const date = this.props.date || new Date();
      const now = new Date();

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

  return connect(mapStateToProps)(WrappedComponent);
};

export default activityModalContainer;
