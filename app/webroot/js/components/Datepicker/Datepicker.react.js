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
  'utils/cloneDate',
  'utils/cx',
  'utils/DateTimeUtils',
  'utils/dateToUnixTime'

], function(

  React,
  Button,
  DatepickerCalendar,
  Glyph,
  HiddenInput,
  TextInput,
  Link,
  cloneDate,
  cx,
  DateTimeUtils,
  dateToUnixTime

) {

  return React.createClass({
    displayName: 'Datepicker',

    propTypes: {
      initialDate: React.PropTypes.instanceOf(Date),
      onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
      return {
        initialDate: new Date()
      };
    },

    getInitialState: function() {
      return {
        date: this.props.initialDate,
        show: false,
        selectedDate: cloneDate(this.props.initialDate)
      };
    },

    componentDidMount: function() {
      window.addEventListener('click', this._closeOnBlur);
    },

    componentWillUnmount: function() {
      window.removeEventListener('click', this._closeOnBlur);
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
          <HiddenInput
            name={this.props.name}
            value={dateToUnixTime(this.state.selectedDate)}
          />
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
              date={date}
              onChange={this._onChange}
              selectedDate={this.state.selectedDate}
            />
          </div>
        </div>
      );
    },

    /**
     * Hide the flyout if the user clicks somewhere other than the
     * trigger element or the flyout.
     */
    _closeOnBlur: function(evt) {
      var target = evt.target;
      var parent = this.getDOMNode();
      if (!(parent.contains(target) || target === parent)) {
        this.setState({
          date: cloneDate(this.state.selectedDate),
          show: false
        })
      }
    },

    _onPrevMonthClick: function() {
      var date = cloneDate(this.state.date);
      date.setMonth(date.getMonth() - 1);
      this.setState({date: date});
    },

    _onNextMonthClick: function() {
      var date = cloneDate(this.state.date);
      date.setMonth(date.getMonth() + 1);
      this.setState({date: date});
    },

    _onChange: function(selectedDate) {
      this.setState({
        date: cloneDate(selectedDate),
        selectedDate: selectedDate,
        show: false
      });

      this.props.onChange && this.props.onChange({
        target: {
          name: this.props.name,
          value: dateToUnixTime(selectedDate)
        }
      });
    },

    _showCalendar: function() {
      this.setState({show: true});
    }
  });

});
