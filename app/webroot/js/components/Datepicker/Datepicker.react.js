/**
 * Datepicker.react
 * @jsx React.DOM
 *
 * Form element that allows the user to pick a date and time using a flyout
 * calendar.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Datepicker/DatepickerCalendar.react',
  'lib/react/jsx!components/Glyph/Glyph.react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'lib/react/jsx!components/Forms/TextInput.react',
  'lib/react/jsx!components/Link/Link.react',
  'utils/cx',
  'utils/DateTimeUtils'

], function(

  React,
  Button,
  DatepickerCalendar,
  Glyph,
  HiddenInput,
  TextInput,
  Link,
  cx,
  DateTimeUtils

) {

  function cloneDate(date) {
    return new Date(date.valueOf());
  }

  return React.createClass({
    displayName: 'Datepicker',

    getInitialState: function() {
      var date = new Date();
      return {
        date: date,
        show: false,
        selectedDate: cloneDate(date)
      };
    },

    componentDidMount: function() {
      // Collapse the dropdown if the user clicks somewhere other than the
      // trigger button.
      window.addEventListener('click', function(evt) {
        var target = evt.target;
        var parent = this.getDOMNode();
        if (!(parent.contains(target) || target === parent)) {
          this.setState({
            date: cloneDate(this.state.selectedDate),
            show: false
          })
        }
      }.bind(this));
    },

    render: function() {
      return (
        <div className="Datepicker">
          <div
            className="DatePickerInput form-control"
            onClick={this._showCalendar}>
            {DateTimeUtils.formatDate(this.state.selectedDate, 'M/D/YYYY')}
            <Glyph
              className="DatePickerCalendarIcon"
              icon="calendar"
              onClick={this._showCalendar}
            />
          </div>
          {this._renderCalendarLayer()}
          <HiddenInput />
        </div>
      );
    },

    _renderCalendarLayer: function() {
      var date = this.state.date;
      return (
        <div
          className={cx({
            'hidden': !this.state.show,
            'popover': true, 
            'fade': true,
            'bottom': true,
            'in': this.state.show
          })}>
          <div className="arrow"></div>
          <div className="popover-header">
            <Link
              className="monthArrow arrowLeft"
              href="javascript:;"
              onClick={this._onPrevMonthClick}>
              <Glyph icon="triangle-left" />
            </Link>
            {DateTimeUtils.formatDate(date, 'MMMM YYYY')}
            <Link
              className="monthArrow arrowRight"
              href="javascript:;"
              onClick={this._onNextMonthClick}>
              <Glyph icon="triangle-right" />
            </Link>
          </div>
          <div className="popover-content">
            <DatepickerCalendar
              selectedDate={cloneDate(this.state.selectedDate)}
              month={date.getMonth()}
              year={date.getFullYear()}
              onChange={this._onChange}
            />
          </div>
        </div>
      );
    },

    _onPrevMonthClick: function() {
      var date = cloneDate(this.state.date);
      date.setUTCMonth(date.getUTCMonth() - 1);
      this.setState({date: date});
    },

    _onNextMonthClick: function() {
      var date = cloneDate(this.state.date);
      date.setUTCMonth(date.getUTCMonth() + 1);
      this.setState({date: date});
    },

    _onChange: function(selectedDate) {
      this.setState({
        date: cloneDate(selectedDate),
        selectedDate: cloneDate(selectedDate),
        show: false
      });
    },

    _showCalendar: function() {
      this.setState({show: true});
    }
  });

});
