/**
 * ModalDialog.react
 * @jsx React.DOM
 *
 * Modal Component
 */
define([

  'lib/react/react',
  'utils/cx'

], function(React, cx) {

  return React.createClass({
    displayName: 'ModalDialog',

    propTypes: {
      /**
       * Whether or not to display a modal backdrop
       */
      modal: React.PropTypes.bool,
      size: React.PropTypes.oneOf(['large', 'default', 'small']),
      shown: React.PropTypes.bool,
    },

    getDefaultProps: function() {
      return {
        modal: true,
        size: 'default',
        shown: false
      };
    },

    render: function() {
      var size = this.props.size;
      var modal =
        <div
          className={cx({
            'modal': true,
            'fade': true,
            'in': this.props.shown,
            'show': this.props.shown
          })}
          tabIndex="-1"
          role="dialog">
          <div className={cx({
            'modal-dialog': true,
            'modal-lg': size === 'large',
            'modal-sm': size === 'small'
          })}>
            <div className="modal-content">
              {this.props.children}
            </div>
          </div>
        </div>;

      if (this.props.modal) {
        modal =
          <div className="modal-container">
            {modal}
            <div
              className={cx({
                'modal-backdrop': true,
                'fade': true,
                'in': this.props.shown,
                'hidden': !this.props.shown
              })}
            />
          </div>;
      }
      return modal;
    }
  });

});
