var React = require('react');
var {Button, Glyphicon, OverlayTrigger, Tooltip} = require('react-bootstrap/lib');

var ActivityModal = require('./ActivityModal.react');
var BaseCalendarDay = require('components/Calendar/BaseCalendarDay.react');
var CalendarDate = require('components/Calendar/CalendarDate.react');
var WorkoutLink = require('./WorkoutLink.react');

var formatDistance = require('utils/formatDistance');

var LAST_DAY_OF_WEEK = 6; // Saturday (Sunday is 0)

/**
* ActivityCalendarDay.react
*/
var ActivityCalendarDay = React.createClass({
  displayName: 'ActivityCalendarDay',

  propTypes: {
    /**
     * The date object for the day being rendered
     */
    date: React.PropTypes.instanceOf(Date),
    /**
     * UTC month, ie: August === 7
     */
    month: React.PropTypes.number,
    weeklyMileage: React.PropTypes.number,
    /**
     * Workouts for the given day
     */
    workouts: React.PropTypes.array,
  },

  getInitialState: function() {
    return {
      showModal: false
    };
  },

  render: function() {
    var {date, month} = this.props;
    var tooltip = <Tooltip id={date.toISOString()}>Add workout</Tooltip>;

    return (
      <BaseCalendarDay date={date} month={month}>
        <div className="wrapper">
          <CalendarDate date={date} />
          {this._renderWorkouts()}
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

  _renderWorkouts: function() /*?object*/ {
    var {workouts} = this.props;
    if (workouts.length) {
      return workouts.map((/*object*/ workout) => {
        return <WorkoutLink key={workout.id} workout={workout} />;
      });
    }
  },

  _renderWeeklyTotal: function(dateObject) {
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

  _hideModal: function() {
    this.setState({showModal: false});
  },

  _showModal: function() {
    this.setState({showModal: true});
  },
});

module.exports = ActivityCalendarDay;
