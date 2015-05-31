/**
 * PageNav.react
 * @jsx React.DOM
 *
 * Tab or pill navigation for use within a page.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Link/Link.react',
  'utils/cx',
  'utils/joinClasses'

], function(

  React,
  Link,
  cx,
  joinClasses

) {

  return React.createClass({
    displayName: 'PageNav',

    propTypes: {
      items: React.PropTypes.array.isRequired,
      justified: React.PropTypes.bool,
      stacked: React.PropTypes.bool,
      type: React.PropTypes.oneOf(['pills', 'tabs'])
    },

    getDefaultProps: function() {
      return {
        type: 'tabs'
      };
    },

    render: function() {
      var props = this.props;
      var type = props.type;
      var classNames = cx({
        'nav': true,
        'nav-justified': props.justified,
        'nav-pills': type === 'pills',
        'nav-stacked': type === 'pills' && props.stacked,
        'nav-tabs': type === 'tabs'
      });

      return (
        <ul className={joinClasses(classNames, this.props.className)}>
          {this._renderPageNavItems()}
        </ul>
      );
    },

    _renderPageNavItems: function() {
      return this.props.items.map(function(item, idx) {
        return (
          <li
            className={cx({
              'active': item.active
            })}
            key={idx}>
            <Link
              href="javascript:;"
              id={item.id}
              onClick={this._onNavItemClick}>
              {item.label}
            </Link>
          </li>
        );
      }.bind(this));
    },

    _onNavItemClick: function(evt) {
      this.props.onChange && this.props.onChange(evt.target.id);
    }
  });

});