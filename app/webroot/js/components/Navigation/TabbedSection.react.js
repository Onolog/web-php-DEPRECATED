/**
 * TabbedSection.react
 * @jsx React.DOM
 *
 * Displays a pane with tabs. Clicking on the tabs changes the content
 * of the pane.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Navigation/Tabs.react',
  'utils/cx',
  'utils/joinClasses'

], function(

  React,
  Tabs,
  cx,
  joinClasses

) {

  function getID(label) {
    return label
      .toLowerCase()
      .split(' ')
      .join('-');
  }

  return React.createClass({
    displayName: 'TabbedSection',

    getInitialState: function() {
      return {
        active: this._getDefaultActiveTab()
      };
    },

    render: function() {
      var children = [];
      var items = [];
      var active = false;

      React.Children.forEach(this.props.children, function(child, idx) {
        // A child can be null or undefined depending on how the component is
        // rendered, so check for that here.
        if (child) {
          var id = getID(child.props.label);
          active = id === this.state.active;
          children.push(React.addons.cloneWithProps(child, {
            className: cx({
              hidden: !active
            }),
            key: idx
          }));

          items.push({
            id: id,
            label: child.props.label,
            active: active
          });
        }
      }.bind(this));

      return (
        <div className={joinClasses('TabbedPane', this.props.className)}>
          {this._renderPageNav(items)}
          {children}
        </div>
      );
    },

    _renderPageNav: function(items) {
      // If there only happens to be one item, there's no point in
      // displaying the tabs.
      if (items.length > 1) {
        return (
          <Tabs
            {...this.props}
            className=""
            items={items}
            onChange={this._onChange}
          />
        );
      }
    },

    _getDefaultActiveTab: function() {
      var props = this.props;
      var childCount = React.Children.count(props.children);
      var firstChild;

      switch (childCount) {
        case 0:
          // No children
          console.warn(
            'TabbedPane: This component requires at least one child.'
          );
          firstChild = null;
          break;
        case 1:
          firstChild = props.children;
          break;
        default:
          firstChild = props.children[0];
          break
      }

      return (
        props.defaultActive ||
        (firstChild && getID(firstChild.props.label))
      );
    },

    _onChange: function(id) {
      this.setState({active: id});
    }
  });

});
