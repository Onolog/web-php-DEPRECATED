var moment = require('moment');
var React = require('react');

var DateInputCalendar = require('./DateInputCalendar.react');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Link = require('components/Link/Link.react');

var cx = require('classnames');

/**
 * DateInputCalendarPopover.react.js
 *
 * Renders a popover displaying a single-month calendar and controls for
 * changing the displayed month. The visibility of the popover is controlled
 * externally.
 */
var DateInputCalendarPopover = React.createClass({
  displayName: 'DateInputCalendarPopover',

  propTypes: {
    date: React.PropTypes.number.isRequired,
    months: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
    years: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      calendarMoment: this._getMoment(this.props),
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // When hiding or showing the popover, the date shown by the calendar
    // should be the same as the selected date.
    if (this.props.show !== nextProps.show) {
      this.setState({calendarMoment: this._getMoment(nextProps)});
    }
  },

  render: function() {
    if (!this.props.show) {
      return null;
    }

    var {calendarMoment} = this.state;
    return (
      <div className={cx('popover', 'fade', 'bottom', 'in')}>
        <div className="arrow" />
        <div className="popover-header DateInputCalendarControls">
          <Link
            className="monthArrow arrowLeft"
            href="#"
            onClick={this._onPrevMonthClick}>
            <Glyphicon glyph="triangle-left" />
          </Link>
          {calendarMoment.format('MMMM YYYY')}
          <Link
            className="monthArrow arrowRight"
            href="#"
            onClick={this._onNextMonthClick}>
            <Glyphicon glyph="triangle-right" />
          </Link>
        </div>
        <div className="popover-content">
          <DateInputCalendar
            selectedDate={this._getMoment(this.props).toDate()}
            month={calendarMoment.month()}
            onChange={this.props.onChange}
            year={calendarMoment.year()}
          />
        </div>
      </div>
    );
  },

  _onPrevMonthClick: function(e) {
    e.preventDefault();
    this.setState({
      calendarMoment: this.state.calendarMoment.subtract(1, 'month'),
    });
  },

  _onNextMonthClick: function(e) {
    e.preventDefault();
    this.setState({
      calendarMoment: this.state.calendarMoment.add(1, 'month'),
    });
  },

  _getMoment: function({date, months, years}) {
    return moment().year(years).month(months).date(date);
  },
});

module.exports = DateInputCalendarPopover;
