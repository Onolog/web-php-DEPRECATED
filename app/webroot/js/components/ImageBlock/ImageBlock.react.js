/**
 * ImageBlock.react
 * @jsx React.DOM
 */

define([

  'lib/react/react',
  'lib/react/jsx!components/Image/Image.react',
  'lib/react/jsx!components/Link/Link.react',
  'utils/cx'

], function(

  React,
  Image,
  Link,
  cx

) {

  return React.createClass({
    displayName: 'ImageBlock',

    propTypes: {
      align: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
      image: React.PropTypes.object.isRequired
    },

    getDefaultProps: function() {
      return {
        align: 'top'
      };
    },
  
    render: function() {
      var align = this.props.align;
      return (
        <div className="media">
          <div className="media-left">
            {this.props.image}
          </div>
          <div className={cx({
            'media-body': true,
            'media-top': align === 'top',
            'media-middle': align === 'middle',
            'media-bottom': align === 'bottom'
          })}>
            {this.props.children}
          </div>
        </div>
      );
    }
  });

});
