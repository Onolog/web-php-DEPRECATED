define([

  'lib/react/react',
  'lib/react/jsx!components/Forms/ConstrainedTextInput.react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'lib/Moment/Moment',
  'utils/cloneDate',
  'utils/cx',
  'utils/dateToUnixTime',
  'utils/pad',
  'lib/underscore/underscore'

], function(

  React,
  ConstrainedTextInput,
  HiddenInput,
  moment,
  cloneDate,
  cx,
  dateToUnixTime,
  pad

) {

  var MERIDIEM = {
    AM: 'AM',
    PM: 'PM'
  };

  function formatter(value) {
    return pad(value, 2);
  }

  /**
   * TimeInput.react.js
   * @jsx React.DOM
   *
   * Structured input for specifiying a time of day. Can be used as a controlled
   * or uncontrolled input similar to a normal form field.
   */
  return React.createClass({
    displayName: 'TimeInput',

    propTypes: {
      defaultValue: React.PropTypes.instanceOf(Date),
      onChange: React.PropTypes.func,
      value: React.PropTypes.instanceOf(Date)
    },

    getInitialState: function() {
      return {
        date: this.props.defaultValue || new Date()
      };
    },
  
    render: function() {
      var date = moment(this._getDate());

      return (
        <div className="TimeInput">
          <div className="form-control">
            <ConstrainedTextInput
              defaultValue={date.format('hh')}
              format={formatter}
              maxLength={2}
              onChange={this._onHoursChange}
              values={_.range(1, 13)}
            />
            {':'}
            <ConstrainedTextInput
              defaultValue={date.format('mm')}
              format={formatter}
              maxLength={2}
              onChange={this._onMinutesChange}
              values={_.range(0, 60)}
            />
            <ConstrainedTextInput
              className="meridiem"
              defaultValue={date.format('A')}
              maxLength={2}
              onChange={this._onMeridiemChange}
              ref="meridiem"
              type="any"
              values={Object.keys(MERIDIEM)}
            />
          </div>
        </div>
      );
    },

    _getDate: function() /*Date*/ {
      var date = this.props.value || this.state.date;
      return cloneDate(date);
    },

    _onHoursChange: function(/*number|string*/ hours) {
      var date = this._getDate();
      var meridiem = this.refs.meridiem.getValue();

      // Display is 12-hour, but Date() is 24-hour. Adjust accordingly.
      if (meridiem === MERIDIEM.PM && hours < 12) {
        hours = hours + 12;
      } else if (meridiem === MERIDIEM.AM && hours >= 12) {
        hours = hours - 12;
      }

      date.setHours(hours);
      this._onChange(date);
    },

    _onMinutesChange: function(/*number|string*/ minutes) {
      var date = this._getDate();
      date.setMinutes(minutes);

      this._onChange(date);
    },

    _onMeridiemChange: function(/*string*/ meridiem) {
      var date = this._getDate();
      var hours = date.getHours();

      hours = (meridiem === MERIDIEM.PM && hours < 12) ?
        hours + 12 : hours - 12;

      date.setHours(hours);
      this._onChange(date);
    },

    _onChange: function(/*Date*/ date) {
      this.setState({date: date});
      this.props.onChange && this.props.onChange(date);
    }
  });

});
