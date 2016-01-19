var React = require('react');

var LeftRight = require('components/LeftRight/LeftRight.react');

var cx = require('classnames');

/**
 * Panel.react
 *
 * Panel component, with optional title, body, and footer
 */
var Panel = React.createClass({
  displayName: 'Panel',

  propTypes: {
    actions: React.PropTypes.any,
    footer: React.PropTypes.any,
    noPadding: React.PropTypes.bool,
    title: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])
  },

  render: function() {
    return (
      <section className={cx(
        'panel',
        'panel-default',
        this.props.className
      )}>
        {this._renderHeader()}
        <div className={cx({
          'panel-body': !this.props.noPadding
        })}>
          {this.props.children}
        </div>
        {this._renderFooter()}
      </section>
    );
  },

  _renderHeader: function() {
    if (!this.props.title && !this.props.actions) {
      return null;
    }

    return (
      <div className="panel-heading">
        <LeftRight>
          <h3 className="panel-title">
            {this.props.title}
          </h3>
          <div className="panel-actions">
            {this.props.actions}
          </div>
        </LeftRight>
      </div>
    );
  },

  _renderFooter: function() {
    if (!this.props.footer) {
      return null;
    }

    return (
      <div className="panel-footer clearfix">
        {this.props.footer}
      </div>
    );
  }
});

module.exports = Panel;
