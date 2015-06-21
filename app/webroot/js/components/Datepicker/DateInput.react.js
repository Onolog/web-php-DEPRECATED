define([

  'lib/react/react',
  'lib/react/jsx!components/Datepicker/DatePickerCalendarPopover.react',
  'lib/react/jsx!components/Glyph/Glyph.react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'utils/cloneDate',
  'utils/cx',
  'utils/DateTimeUtils',
  'utils/dateToUnixTime'

], function(

  React,
  DatePickerCalendarPopover,
  Glyph,
  HiddenInput,
  cloneDate,
  cx,
  DateTimeUtils,
  dateToUnixTime

) {

  /**
   * DateInput.react
   * @jsx React.DOM
   *
   * Structured input for selecting a date via a calendar picker.
   */
  return React.createClass({
    displayName: 'DateInput',

    propTypes: {
      defaultValue: React.PropTypes.instanceOf(Date),
      onChange: React.PropTypes.func,
      value: React.PropTypes.instanceOf(Date)
    },

    getInitialState: function() {
      return {
        date: this.props.defaultValue || new Date(),
        showCalendar: false
      };
    },

    componentDidMount: function() {
      window.addEventListener('click', this._closeOnBlur);
    },

    componentWillUnmount: function() {
      window.removeEventListener('click', this._closeOnBlur);
    },

    render: function() {
      var date = this._getDate();

      return (
        <div className="DatePicker">
          <div
            className="DatePickerInput form-control"
            onClick={this._showCalendar}>
            <div className="DatePickerDisplay">
              {DateTimeUtils.formatDate(date, 'M/D/YYYY')}
            </div>
            <Glyph
              className="DatePickerCalendarIcon"
              icon="calendar"
              onClick={this._showCalendar}
            />
          </div>
          <DatePickerCalendarPopover
            date={date}
            onChange={this._onChange}
            show={this.state.showCalendar}
          />
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
          // Resets the calendar date
          date: this._getDate(),
          showCalendar: false
        })
      }
    },

    _getDate: function() /*Date*/ {
      var date = this.props.value || this.state.date;
      return cloneDate(date);
    },

    _showCalendar: function() {
      this.setState({showCalendar: true});
    },

    _onChange: function(/*Date*/ date) {
      this.setState({
        // date: date,
        showCalendar: false
      });
      this.props.onChange && this.props.onChange(date);
    }
  });

});
