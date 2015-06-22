define([

  'lib/react/react',
  'lib/react/jsx!components/DateTimePicker/DateInputCalendarPopover.react',
  'lib/react/jsx!components/Glyph/Glyph.react',
  'utils/cloneDate',
  'utils/cx',
  'utils/DateTimeUtils'

], function(

  React,
  DateInputCalendarPopover,
  Glyph,
  cloneDate,
  cx,
  DateTimeUtils

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
        <div className="DateInput">
          <div
            className="form-control"
            onClick={this._showCalendar}>
            <div className="DateInputDisplay">
              {DateTimeUtils.formatDate(date, 'M/D/YYYY')}
            </div>
            <Glyph
              className="DateInputCalendarIcon"
              icon="calendar"
              onClick={this._showCalendar}
            />
          </div>
          <DateInputCalendarPopover
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
