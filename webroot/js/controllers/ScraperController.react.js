import {isEmpty} from 'lodash';
import React from 'react';
import {FormControl, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';

import Activity from 'components/Activities/Activity.react';
import AppFullPage from 'components/Page/AppFullPage.react';
import EmptyState from 'components/EmptyState.react';
import Loader from 'components/Loader/Loader.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';

import ActionTypes from 'constants/ActionTypes';
import {getGarminActivity} from 'actions/activities';
import garminUrlToActivity from 'utils/garmin/garminUrlToActivity';

const mapStateToProps = ({garminData, pendingRequests, session}) => {
  return {
    garminData,
    pendingRequests,
    user: session,
  };
};

const ScraperController = React.createClass({
  render() {
    return (
      <AppFullPage>
        <PageHeader full title="Garmin Activity" />
        <PageFrame scroll>
          <Panel header={<h3>Enter a valid Garmin URL</h3>}>
            <FormControl
              onChange={this._handleChange}
              type="text"
            />
          </Panel>
          <Panel>
            {this._renderContents()}
          </Panel>
        </PageFrame>
      </AppFullPage>
    );
  },

  _renderContents() {
    const {garminData, pendingRequests, user} = this.props;

    if (!isEmpty(garminData)) {
      return (
        <Activity
          activity={garminUrlToActivity(garminData)}
          athlete={user}
          fill
        />
      );
    }

    if (pendingRequests[ActionTypes.GARMIN_ACTIVITY_SCRAPE]) {
      return (
        <EmptyState>
          <Loader background full />
        </EmptyState>
      );
    }

    return (
      <EmptyState>
        No activity to display. Please enter a url.
      </EmptyState>
    );
  },

  _handleChange(e) {
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
  },
});

module.exports = connect(mapStateToProps)(ScraperController);
