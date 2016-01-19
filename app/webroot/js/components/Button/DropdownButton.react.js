var React = require('react');
var ReactDOM = require('react-dom');

var Button = require('components/Button/Button.react');
var ButtonGroup = require('components/ButtonGroup/ButtonGroup.react');
var Menu = require('components/Menu/Menu.react');

var cx = require('classnames');

var DropdownButton = React.createClass({
  displayName: 'DropdownButton',

  propTypes: {
    dropUp: React.PropTypes.bool,
    /**
     * The menu to be displayed.
     */
    menu: React.PropTypes.object.isRequired,
    split: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      dropUp: false,
      split: false
    };
  },

  getInitialState: function() {
    return {
      open: false
    };
  },

  componentDidMount: function() {
    // Collapse the dropdown if the user clicks somewhere other than the
    // trigger button.
    window.addEventListener('click', this._onWindowClick);
  },

  componentWillUnmount: function() {
    window.removeEventListener('click', this._onWindowClick);
  },

  render: function() {
    var split = this.props.split;
    var use = this.props.use;

    var primaryButton;
    var secondaryButton;
    if (split) {
      primaryButton =
        <Button
          label={this.props.label}
          onClick={this._onButtonClick}
          use={use}
        />;

      secondaryButton =
        <Button
          className="dropdown-toggle"
          customGlyph={
            <span className="caret" />
          }
          glyphPosition="right"
          onClick={this._toggleMenu}
          ref="trigger"
          use={use}
        />;
    } else {
      primaryButton =
        <Button
          className="dropdown-toggle"
          customGlyph={
            <span className="caret" />
          }
          glyphPosition="right"
          label={this.props.label}
          onClick={this._toggleMenu}
          ref="trigger"
          use={use}
        />;
    }

    return (
      <ButtonGroup
        className={cx({
          'dropup': this.props.dropUp,
          'open': this.state.open
        })}
        size={this.props.size}>
        {primaryButton}
        {secondaryButton}
        {this.props.menu}
      </ButtonGroup>
    );
  },

  _toggleMenu: function() {
    this.setState({open: !this.state.open});
  },

  _onWindowClick: function(evt) {
    var target = evt.target;
    var triggerNode = ReactDOM.findDOMNode(this.refs.trigger);
    if (!(triggerNode.contains(target) || target === triggerNode)) {
      this.setState({open: false})
    }
  }
});

module.exports = DropdownButton;
