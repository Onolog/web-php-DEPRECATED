var React = require('react');

var DateInputCalendar = require('./DateInputCalendar.react');
var Glyph = require('../Glyph/Glyph.react');
var Link = require('../Link/Link.react');

var cloneDate = require('../../utils/cloneDate');
var cx = require('classnames');
var DateTimeUtils = require('../../utils/DateTimeUtils');

/**
 * DateInputCalendarPopover.react.js
 * @jsx React.DOM
 *
 * Renders a popover displaying a single-month calendar and controls for
 * changing the displayed month. The visibility of the popover is controlled
 * externally.
 */
var DateInputCalendarPopover = React.createClass({
  displayName: 'DateInputCalendarPopover',

  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired,
    onChange: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      calendarDate: this.props.date
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // When hiding or showing the popover, the date shown by the calendar
    // should be the same as the selected date.
    if (this.props.show !== nextProps.show) {
      this.setState({calendarDate: nextProps.date});
    }
  },

  render: function() {
    if (!this.props.show) {
      return <span />;
    }

    return (
      <div
        className={cx({
          'popover': true, 
          'fade': true,
          'bottom': true,
          'in': true
        })}>
        <div className="arrow"></div>
        <div className="popover-header DateInputCalendarControls">
          <Link
            className="monthArrow arrowLeft"
            href="javascript:;"
            onClick={this._onPrevMonthClick}>
            <Glyph icon="triangle-left" />
          </Link>
          {DateTimeUtils.formatDate(this.state.calendarDate, 'MMMM YYYY')}
          <Link
            className="monthArrow arrowRight"
            href="javascript:;"
            onClick={this._onNextMonthClick}>
            <Glyph icon="triangle-right" />
          </Link>
        </div>
        <div className="popover-content">
          <DateInputCalendar
            calendarDate={this.state.calendarDate}
            onChange={this.props.onChange}
            date={this.props.date}
          />
        </div>
      </div>
    );
  },

  _onPrevMonthClick: function() {
    var date = cloneDate(this.state.calendarDate);
    date.setMonth(date.getMonth() - 1);
    this.setState({calendarDate: date});
  },

  _onNextMonthClick: function() {
    var date = cloneDate(this.state.calendarDate);
    date.setMonth(date.getMonth() + 1);
    this.setState({calendarDate: date});
  }
});

module.exports = DateInputCalendarPopover;
