var React = require('react');
var cx = require('classnames');

/**
 * Table.react
 *
 * Wrapper around standard HTML table, with Boostrap support.
 */
var Table = React.createClass({
  displayName: 'Table',

  propTypes: {
    border: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    striped: React.PropTypes.bool
  },

  render: function() {
    var props = this.props;
    return (
      <table className={cx({
        'table': true,
        'table-bordered': props.border,
        'table-condensed': props.condensed,
        'table-hover': props.hover,
        'table-striped': props.striped
      })}>
        {this.props.children}
      </table>
    );
  }

});

module.exports = Table;
