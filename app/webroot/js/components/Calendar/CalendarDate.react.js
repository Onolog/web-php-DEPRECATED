/**
 * CalendarDate.react
 * @jsx React.DOM
 *
 * Renders the date in a single calendar cell.
 */
define([

  'lib/react/react',
  'utils/cx'

], function(React, cx) {

  return React.createClass({
    displayName: 'CalendarDate',

    propTypes: {
      /**
       * Date object for the day being rendered
       */
      date: React.PropTypes.instanceOf(Date).isRequired,
    },

    render: function() {
      return (
        <h3>{this.props.date.getDate()}</h3>
      );
    }
  });

});