var React = require('react');

var Glyph = require('../../components/Glyph/Glyph.react');
var Link = require('../../components/Link/Link.react');
var TooltipMixin = require('../../mixins/TooltipMixin.react');

var cx = require('classnames');

/**
 * AbstractButton.react
 * @jsx React.DOM
 */
var AbstractButton = React.createClass({
  displayName: 'AbstractButton',

  mixins: [TooltipMixin],

  propTypes: {
    /**
     * When a custom glyph is needed, you can pass in
     * an image or styled element.
     */
    customGlyph: React.PropTypes.object,
    /**
     * Standard glyphs use the bootstrap glyph font
     * and simply take a glyph name.
     */
    glyph: React.PropTypes.string,
    /**
     * Glyphs can be positioned either on the right or left.
     */
    glyphPosition: React.PropTypes.oneOf(['left', 'right']),
    depressed: React.PropTypes.bool,
    label: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      glyphPosition: 'left'
    };
  },

  render: function() {
    var className = cx({
      'disabled': this.props.disabled && this.props.href,
      'active': this.props.depressed
    }, this.props.className);

    var children = [this._renderLabel()];
    var glyphChild = this._renderGlyph();

    if (this.props.glyphPosition === 'right') {
      children.push(glyphChild);
    } else {
      children.unshift(glyphChild);
    }

    if (this.props.href) {
      return (
        <Link
          {...this.props}
          className={className}
          disabled={null}>
          {children}
        </Link>
      );
    } else {
      var type = this.props.type || 'submit';
      var value = type === 'submit' ? '1' : null;
      return (
        <button
          {...this.props}
          className={className}
          disabled={this.props.disabled}
          type={type}
          value={value}>
          {children}
        </button>
      );
    }
  },

  _renderLabel: function() {
    var label = this.props.label;
    if (label) {
      return (
        <span key="labelChild" className="btnLabel">
          {label}
        </span>
      );
    }
  },

  _renderGlyph: function() {
    var glyphChild = this.props.customGlyph || this.props.glyph;

    if (this.props.glyph) {
      glyphChild = <Glyph icon={this.props.glyph} />;
    }

    return glyphChild && React.cloneElement(glyphChild, {
      className: cx(glyphChild.props.className, 'glyphChild'),
      key: 'glyphChild'
    });
  }

});

module.exports = AbstractButton;
