var React = require('react');

var Glyph = require('components/Glyph/Glyph.react');
var Link = require('components/Link/Link.react');

var TooltipMixin = require('mixins/TooltipMixin.react');

var cx = require('classnames');

/**
 * AbstractButton.react
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
      glyphPosition: 'left',
      type: 'submit'
    };
  },

  render: function() {
    var {
      className,
      depressed,
      disabled,
      glyphPosition,
      href,
      tooltip,
      type
    } = this.props;

    className = cx({
      'disabled': disabled && href,
      'active': depressed
    }, className);

    var children = [this._renderLabel()];
    var glyphChild = this._renderGlyph();

    if (glyphPosition === 'right') {
      children.push(glyphChild);
    } else {
      children.unshift(glyphChild);
    }

    if (href) {
      return (
        <Link
          {...this.props}
          className={className}
          disabled={null}>
          {children}
        </Link>
      );
    }

    return this.addTooltip(
      <button
        {...this.props}
        className={className}
        disabled={disabled}
        value={type === 'submit' ? '1' : null}>
        {children}
      </button>
    );
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
