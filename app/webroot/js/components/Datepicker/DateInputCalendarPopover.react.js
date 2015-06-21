define([

  'lib/react/react',
  'lib/react/jsx!components/Datepicker/DateInputCalendar.react',
  'lib/react/jsx!components/Glyph/Glyph.react',
  'lib/react/jsx!components/Link/Link.react',
  'utils/cloneDate',
  'utils/cx',
  'utils/DateTimeUtils',

], function(

  React,
  DateInputCalendar,
  Glyph,
  Link,
  cloneDate,
  cx,
  DateTimeUtils

) {

  /**
   * DateInputCalendarPopover.react.js
   * @jsx React.DOM
   *
   * Renders a popover displaying a single-month calendar and controls for
   * changing the displayed month. The visibility of the popover is controlled
   * externally.
   */
  return React.createClass({
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
      return (
        <div
          className={cx({
            'hidden': !this.props.show,
            'popover': true, 
            'fade': true,
            'bottom': true,
            'in': this.props.show
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

});
