/**
 * Panel.react
 * @jsx React.DOM
 *
 * Panel component, with optional title, body, and footer
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'utils/cx',
  'utils/joinClasses'

], function(React, LeftRight, cx, joinClasses) {

  return React.createClass({
    displayName: 'Panel',

    propTypes: {
      actions: React.PropTypes.any,
      footer: React.PropTypes.any,
      fullBleed: React.PropTypes.bool,
      title: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ])
    },

    render: function() {
      return (
        <section className={joinClasses(
          'panel',
          'panel-default',
          this.props.className
        )}>
          {this._renderHeader()}
          <div className={cx({
            'panel-body': !this.props.fullBleed
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

});
