var React = require('react');
var moment = require('moment');

/**
 * BaseCalendar.react
 */
var DAYS_IN_WEEK = 7;
var ISO_DAY_OF_WEEK = 'E';

var BaseCalendar = React.createClass({
  displayName: 'BaseCalendar',

  propTypes: {
    borders: React.PropTypes.bool,
    headerFormat: React.PropTypes.oneOf([
      'd',    // M, T, W...
      'dd',   // Mo, Tu, We...
      'ddd',  // Mon, Tue, Wed...
      'dddd'  // Monday, Tuesday, Wednesday...
    ])
  },

  getDefaultProps: function() {
    return {
      borders: true,
      headerFormat: 'ddd'
    };
  },

  render: function() {
    return (
      <table className={this.props.className}>
        {this._renderHeaderRow()}
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    );
  },

  /**
   * Renders the days of the week in the header cells ('Sun', 'Mon', etc.).
   *
   * TODO: Allow for different week start days. Currently Sunday.
   */
  _renderHeaderRow: function() {
    var headerCells = [];
    for (var ii=0; ii < DAYS_IN_WEEK; ii++) {
      headerCells.push(
        <th key={ii}>{this._formatDayOfWeek(ii)}</th>
      );
    }
    return <thead><tr>{headerCells}</tr></thead>;
  },

  _formatDayOfWeek: function(day) {
    var format = this.props.headerFormat;
    var substr = false;

    // Moment doesn't support formatting days as a single letter,
    // so just do it manually.
    if (format === 'd') {
      format = 'dd';
      substr = true;
    }

    var formatted = moment(day, ISO_DAY_OF_WEEK).format(format);
    return substr ? formatted.substr(0, 1) : formatted;
  }
});

module.exports = BaseCalendar;
