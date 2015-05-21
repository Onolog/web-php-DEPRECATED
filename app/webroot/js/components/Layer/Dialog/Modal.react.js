/**
 * Modal.react
 * @jsx React.DOM
 *
 * Modal Component
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Alert/Alert.react',
  'lib/react/jsx!components/Dialog/Dialog.react',
  'lib/react/jsx!components/Dialog/DialogBody.react',
  'lib/react/jsx!components/Dialog/DialogFooter.react',
  'lib/react/jsx!components/Dialog/DialogHeader.react',
  'lib/jquery/jquery.min'

], function(

  React,
  Alert,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader

) {

  return React.createClass({
    displayName: 'Modal',

    propTypes: {
      /**
       * Alert message and type to display
       */
      alert: React.PropTypes.shape({
        message: React.PropTypes.string,
        type: React.PropTypes.string
      }),
      footer: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
      ]),
      isLoading: React.PropTypes.bool,
      /**
       * Whether or not to display a modal backdrop
       */
      modal: React.PropTypes.bool,
      /**
       * Callback for closing the dialog
       */
      onRequestClose: React.PropTypes.func,
      size: React.PropTypes.oneOf(['large', 'default', 'small']),
      shown: React.PropTypes.bool,
      title: React.PropTypes.string,
      useCloseButton: React.PropTypes.bool
    },

    getDefaultProps: function() {
      return {
        alert: null
      };
    },

    componentDidMount: function() {
      window.addEventListener('keydown', this._onKeyDown, true);
    },

    componentDidUpdate: function(prevProps, prevState) {
      // If the dialog has been opened or closed, toggle the body class
      if (prevProps.shown !== this.props.shown) {
        $(document.body).toggleClass('modal-open', this.props.shown);
      }
    },

    componentWillUnmount: function() {
      window.removeEventListener('keydown', this._onKeyDown, true);
    },

    render: function() {
      var props = this.props;

      if (!props.shown) {
        return null;
      }

      return (
        <Dialog
          modal={props.modal}
          shown={props.shown}
          size={props.size}>
          {this._renderModalHeader()}
          <DialogBody isLoading={props.isLoading}>
            {this._renderAlertMessage()}
            {props.children}
          </DialogBody>
          {this._renderModalFooter()}
        </Dialog>
      );
    },

    _renderModalHeader: function() {
      var title = this.props.title;
      if (title) {
        return (
          <DialogHeader
            onClose={this._onClose}
            title={title}
            useCloseButton={this.props.useCloseButton}
          />
        );
      }
    },

    _renderAlertMessage: function() {
      if (this.props.alert) {
        return (
          <Alert type={this.props.alert.type}>
            {this.props.alert.message}
          </Alert>
        );
      }
    },

    _renderModalFooter: function() {
      var footer = this.props.footer;
      if (footer) {
        return <DialogFooter>{footer}</DialogFooter>;
      }
    },

    _onClose: function(/*object*/ event) {
      this.props.onRequestClose && this.props.onRequestClose();
    },

    _onKeyDown: function(/*object*/ event) {
      if (
        this.props.shown &&
        (event.key === 'Escape' || event.keyCode === 27)
      ) {
        this._onClose();
      }
    }

  });

});
