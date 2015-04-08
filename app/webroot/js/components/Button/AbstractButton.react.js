/**
 * AbstractButton.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!mixins/TooltipMixin.react',

], function(React, Link, TooltipMixin) {

  return React.createClass({
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
      var cx = React.addons.classSet;
      var cloneWithProps = React.addons.cloneWithProps;
      
      var className = cx({
        'disabled': this.props.disabled && this.props.href,
        'active': this.props.depressed
      });
  
      var labelChild = this.props.label;
      if (labelChild) {
        labelChild =
          <span key="labelChild" className="btnLabel">
            {labelChild}
          </span>;
      }
  
      var newProps;
      var glyphChild = this.props.customGlyph || this.props.glyph;
      if (this.props.glyph) {
        glyphChild =
          <i key="glyphChild" className={'glyphicon glyphicon-' + glyphChild} />;
      }
  
      var glyphRightChild;
      if (this.props.glyphPosition === 'right') {
        glyphRightChild = glyphChild;
        newProps = {};
        if (this.props.label) {
          newProps.className = 'mls';
        }
        if (!glyphRightChild.props.key) {
          newProps.key = 'glyphRight';
        }
        glyphRightChild = cloneWithProps(glyphRightChild, newProps);
      }
  
      var root;
      if (this.props.href) {
        root = <Link disabled={null} />;
      } else {
        var type = this.props.type || 'submit';
        root = <button type={type} disabled={this.props.disabled} />;
        if (type === 'submit') {
          root.props.value = '1';
        }
      }
  
      root.props.children = [glyphChild, labelChild, glyphRightChild];
      root.props.className = className;
      root.props.label = null;
      return this.transferPropsTo(root);
    }

  });

});
