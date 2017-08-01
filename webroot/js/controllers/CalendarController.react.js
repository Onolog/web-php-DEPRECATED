import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {Button, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import ActivityCalendar from 'components/Activities/ActivityCalendar.react';
import ActivityImportModal from 'components/Activities/ActivityImportModal.react';
import ActivityModal from 'components/Activities/ActivityModal.react';

import AppFullPage from 'components/Page/AppFullPage.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';

import {fetchActivities} from 'actions/activities';

import {ACTIVITIES_FETCH, ACTIVITY_ADD} from 'constants/ActionTypes';
import {LEFT, RIGHT} from 'constants/KeyCode';

const getMoment = ({month, year}) => moment({month: +month - 1, year});

const mapStateToProps = ({activities, pendingRequests}) => {
  return {
    activities,
    pendingRequests,
  };
};

/**
 * CalendarController.react
 */
class CalendarController extends React.Component {
  static propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    showAddModal: false,
    showImportModal: false,
  };

  componentWillMount() {
    const {params} = this.props;
    let m = getMoment(params);

    // Set path to today if params are invalid.
    if (!m.isValid()) {
      m = moment();
    }

    // Load initial data.
    this._fetchData(m);

    window.addEventListener('keydown', this._onKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.pendingRequests[ACTIVITY_ADD] &&
      !nextProps.pendingRequests[ACTIVITY_ADD]
    ) {
      this._hideModal();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._onKeyDown);
  }

  render() {
    const {params, pendingRequests} = this.props;
    const isLoading = pendingRequests[ACTIVITIES_FETCH];

    const activities = isLoading ?
      // Don't show any activities while new ones are loading.
      [] :
      // Filter out activities that aren't within a couple weeks of the selected
      // month, otherwise calendar rendering can be slow.
      this.props.activities.filter(activity => (
        moment(activity.start_date).isBetween(
          // Create new moments here, since manipulating them mutates the
          // underlying moment.
          getMoment(params).subtract({weeks: 1}),
          getMoment(params).add({weeks: 6})
        )
      ));

    const m = getMoment(params);

    return (
      <AppFullPage title="Calendar">
        <PageHeader full title={m.format('MMMM YYYY')}>
          {this._renderButtonGroup()}
        </PageHeader>
        <PageFrame fill isLoading={isLoading}>
          <ActivityCalendar
            activities={activities}
            date={m.toDate()}
          />
        </PageFrame>
      </AppFullPage>
    );
  }

  _renderButtonGroup = () => {
    return (
      <div>
        <DropdownButton
          bsSize="small"
          bsStyle="success"
          id="activity-create"
          noCaret
          pullRight
          title={<MaterialIcon icon="plus" />}>
          <MenuItem onClick={this._showImportModal}>
            <MaterialIcon icon="cloud-upload" /> Import activity from URL
          </MenuItem>
          <MenuItem onClick={this._showAddModal}>
            <MaterialIcon icon="calendar-plus" /> Add manual activity
          </MenuItem>
        </DropdownButton>
        <ButtonGroup bsSize="small">
          <Button
            className="monthArrow"
            onClick={this._onLastMonthClick}>
            <MaterialIcon icon="arrow-left" />
          </Button>
          <Button onClick={this._onThisMonthClick}>
            Today
          </Button>
          <Button
            className="monthArrow"
            onClick={this._onNextMonthClick}>
            <MaterialIcon icon="arrow-right" />
          </Button>
        </ButtonGroup>
        <ActivityModal
          onHide={this._hideModal}
          show={this.state.showAddModal}
        />
        <ActivityImportModal
          onHide={this._hideModal}
          show={this.state.showImportModal}
        />
      </div>
    );
  };

  _fetchData = m => {
    this.props.dispatch(fetchActivities(m.year(), m.month() + 1));
  };

  _hideModal = () => {
    this.setState({
      showAddModal: false,
      showImportModal: false,
    });
  };

  _showAddModal = () => {
    this.setState({showAddModal: true});
  };

  _showImportModal = () => {
    this.setState({showImportModal: true});
  };

  _onKeyDown = e => {
    switch (e.keyCode) {
      case LEFT:
        e.preventDefault();
        this._onLastMonthClick();
        break;
      case RIGHT:
        e.preventDefault();
        this._onNextMonthClick();
        break;
    }
  }

  _onLastMonthClick = () => {
    this._updateCalendar(getMoment(this.props.params).subtract({months: 1}));
  };

  _onThisMonthClick = () => {
    this._updateCalendar(moment());
  };

  _onNextMonthClick = () => {
    this._updateCalendar(getMoment(this.props.params).add({months: 1}));
  };

  _updateCalendar = newMoment => {
    // Don't update if the month hasn't changed.
    if (newMoment.isSame(getMoment(this.props.params), 'month')) {
      return;
    }

    browserHistory.push(newMoment.format('/YYYY/MM'));

    this._fetchData(newMoment);
  };
}

module.exports = connect(mapStateToProps)(CalendarController);
