import React, {PropTypes} from 'react';
import {Button, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap';

import ActivityModal from 'components/Activities/ActivityModal.react';
import BaseCalendarDay from 'components/Calendar/BaseCalendarDay.react';
import CalendarDate from 'components/Calendar/CalendarDate.react';
import ActivityLink from 'components/Activities/ActivityLink.react';

import formatDistance from 'utils/formatDistance';

const LAST_DAY_OF_WEEK = 6; // Saturday (Sunday is 0)

/**
* ActivityCalendarDay.react
*/
const ActivityCalendarDay = React.createClass({
  displayName: 'ActivityCalendarDay',

  propTypes: {
    /**
     * Activities for the given day
     */
    activities: PropTypes.array,
    /**
     * The date object for the day being rendered
     */
    date: PropTypes.instanceOf(Date),
    /**
     * UTC month, ie: August === 7
     */
    month: PropTypes.number,
    weeklyMileage: PropTypes.number,
  },

  getInitialState() {
    return {
      showModal: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    const {activities} = this.props;
    const thisCount = activities && activities.length;
    const nextCount = nextProps.activities && nextProps.activities.length;

    if (nextCount !== thisCount) {
      this._hideModal();
    }
  },

  render() {
    const {date, month} = this.props;
    const tooltip = <Tooltip id={date.toISOString()}>Add activity</Tooltip>;

    return (
      <BaseCalendarDay date={date} month={month}>
        <div className="wrapper">
          <CalendarDate date={date} />
          {this._renderActivities()}
          <OverlayTrigger overlay={tooltip} placement="right">
            <Button
              bsSize="xsmall"
              bsStyle="default"
              className="add"
              onClick={this._showModal}>
              <Glyphicon glyph="plus" />
            </Button>
          </OverlayTrigger>
          <ActivityModal
            date={date}
            onHide={this._hideModal}
            show={this.state.showModal}
          />
          {this._renderWeeklyTotal(date)}
        </div>
      </BaseCalendarDay>
    );
  },

  _renderActivities() /*?object*/ {
    const {activities} = this.props;
    if (activities.length) {
      return activities.map(this._renderActivityLink);
    }
  },

  _renderActivityLink(/*object*/ activity) {
    return <ActivityLink activity={activity} key={activity.id} />;
  },

  _renderWeeklyTotal(dateObject) {
    if (dateObject.getDay() === LAST_DAY_OF_WEEK) {
      return (
        <div className="total">
          <span className="distance">
            {formatDistance(this.props.weeklyMileage)}
          </span> mi
        </div>
      );
    }
  },

  _hideModal() {
    this.setState({showModal: false});
  },

  _showModal() {
    this.setState({showModal: true});
  },
});

module.exports = ActivityCalendarDay;