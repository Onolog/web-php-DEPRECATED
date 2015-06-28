/**
 * DateTimePicker.react
 * @jsx React.DOM
 *
 * Form element that allows the user to select a date and time.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/DateTimePicker/DateInput.react',
  'lib/react/jsx!components/DateTimePicker/TimeInput.react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'utils/cx',
  'utils/dateToUnixTime'

], function(

  React,
  DateInput,
  TimeInput,
  HiddenInput,
  cx,
  dateToUnixTime

) {

  return React.createClass({
    displayName: 'DateTimePicker',

    propTypes: {
      defaultValue: React.PropTypes.instanceOf(Date),
      onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
      return {
        defaultValue: new Date()
      };
    },

    getInitialState: function() {
      return {
        date: this.props.defaultValue
      };
    },

    render: function() {
      var date = this.state.date;

      return (
        <div className="DateTimePicker">
          <DateInput
            onChange={this._onChange}
            value={date}
          />
          <TimeInput
            onChange={this._onChange}
            value={date}
          />
          <HiddenInput
            name={this.props.name}
            value={dateToUnixTime(date)}
          />
        </div>
      );
    },

    _onChange: function(/*Date*/ date) {
      this.setState({date: date});
      this.props.onChange && this.props.onChange(date);
    }
  });

});
