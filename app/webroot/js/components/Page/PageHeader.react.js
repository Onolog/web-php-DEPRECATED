import React from 'react';

import LeftRight from 'components/LeftRight/LeftRight.react';

/**
 * PageHeader.react
 */
const PageHeader = React.createClass({
  displayName: 'PageHeader',

  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
    return (
      <LeftRight className="pageHeader">
        <h2>{this.props.title}</h2>
        {this.props.children}
      </LeftRight>
    );
  },
});

module.exports = PageHeader;
