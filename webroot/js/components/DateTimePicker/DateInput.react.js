import {Glyphicon} from 'react-bootstrap';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';
import React from 'react';

import DateInputCalendarPopover from './DateInputCalendarPopover.react';

/**
 * DateInput.react
 *
 * Structured input for selecting a date via a calendar picker.
 */
const DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    date: React.PropTypes.number.isRequired,
    months: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    years: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      showCalendar: false,
    };
  },

  render: function() {
    const {date, months, years} = this.props;
    var m = moment({date, months, years});

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
          onHide={this._hideCalendar}
          show={this.state.showCalendar}
        />
      </div>
    );
  },

  _hideCalendar: function() {
    this.setState({showCalendar: false});
  },

  _showCalendar: function() {
    this.setState({showCalendar: true});
  },

  /**
   * From `onClickOutside` HoC.
   */
  handleClickOutside: function(e) {
    this._hideCalendar();
  },

  _onChange: function(/*object*/ dateObject) {
    this._hideCalendar();
    this.props.onChange(dateObject);
  },
});

module.exports = onClickOutside(DateInput);
