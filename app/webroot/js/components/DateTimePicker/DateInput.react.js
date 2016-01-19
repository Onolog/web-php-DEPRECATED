var moment = require('moment');
var React = require('react');
var ReactDOM = require('react-dom');

var DateInputCalendarPopover = require('./DateInputCalendarPopover.react');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var cloneDate = require('utils/cloneDate');
var cx = require('classnames');

/**
 * DateInput.react
 *
 * Structured input for selecting a date via a calendar picker.
 */
var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    date: React.PropTypes.number.isRequired,
    months: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    years: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
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
    var {date, months, timezone, years} = this.props;
    var m = moment({
      date: date,
      months: months,
      years: years
    });

    return (
      <div className="DateInput">
        <div
          className="form-control"
          onClick={this._showCalendar}>
          <div className="DateInputDisplay">
            {m.format('M/D/YYYY')}
          </div>
          <Glyphicon
            className="DateInputCalendarIcon"
            glyph="calendar"
          />
        </div>
        <DateInputCalendarPopover
          {...this.props}
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
    var parent = ReactDOM.findDOMNode(this);
    if (!(parent.contains(target) || target === parent)) {
      this.setState({showCalendar: false});
    }
  },

  _showCalendar: function() {
    this.setState({showCalendar: true});
  },

  _onChange: function(/*object*/ dateObject) {
    this.setState({showCalendar: false});
    this.props.onChange(dateObject);
  }
});

module.exports = DateInput;
