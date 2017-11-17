import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import {connect} from 'react-redux';

import ActivityForm from 'components/Activities/ActivityForm.react';
import AppForm from 'components/Forms/AppForm.react';
import EmptyState from 'components/EmptyState.react';
import Loader from 'components/Loader/Loader.react';

import {getGarminActivity} from 'actions/activities';

class ActivityFromUrlForm extends React.Component {
  static propTypes = {
    activity: PropTypes.object,
    isLoading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const {activity, onChange, isLoading} = this.props;

    if (!isEmpty(activity)) {
      return (
        <ActivityForm
          activity={activity}
          onChange={onChange}
        />
      );
    }

    if (isLoading) {
      return (
        <EmptyState>
          <Loader background full />
        </EmptyState>
      );
    }

    return (
      <AppForm>
        <FormGroup>
          <ControlLabel>
            Enter a Garmin Activity URL
          </ControlLabel>
          <FormControl
            autoFocus
            onChange={this._handleUrlChange}
            type="text"
          />
        </FormGroup>
      </AppForm>
    );
  }

  _handleUrlChange = (e) => {
    const url = e.target.value;

    if (!url) {
      return;
    }

    // Extract the activity id and do some basic validation.
    const activityId = parseInt(url.split('/').pop(), 10);
    if (!activityId) {
      alert('Invalid url');
      return;
    }

    this.props.dispatch(getGarminActivity(activityId));
  };
}

export default connect()(ActivityFromUrlForm);
