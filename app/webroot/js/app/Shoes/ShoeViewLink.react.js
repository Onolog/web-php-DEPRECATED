/**
 * ShoeViewLink.react
 * @jsx React.DOM
 *
 * Linkified name of shoe. Opens a dialog with the shoe's data when clicked.
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Shoes/ShoeView.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Modal/Modal.react',
  'mixins/LayerMixin.react',
  'actions/ShoeActions',
  'stores/ShoeStore',
  'utils/cx'

], function(

  React,
  ShoeView,
  Button,
  Link,
  Modal,
  LayerMixin,
  ShoeActions,
  ShoeStore,
  cx

) {

  return React.createClass({
    displayName: 'ShoeViewLink',

    mixins: [LayerMixin],

    propTypes: {
      shoe: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        isLoading: false,
        shown: false
      };
    },

    render: function() {
      return (
        <Link href="javascript:;" onClick={this._onViewClick}>
          {this.props.shoe.name}
        </Link>
      );
    },

    renderLayer: function() {
      var shoe = this.props.shoe;
      return (
        <Modal
          alert={this.state.alert}
          isLoading={this.state.isLoading}
          shown={this.state.shown}
          size="small"
          onRequestClose={this._closeDialog}
          title={shoe.name}
          footer={
            <Button
              label="Close"
              onClick={this._closeDialog}
            />
          }>
          <ShoeView
            activities={shoe.activities}
            activityCount={shoe.activity_count}
            mileage={shoe.mileage}
          />
        </Modal>
      );
    },

    _closeDialog: function() {
      if (this.isMounted()) {
        this.setState(this.getInitialState());
      }
    },

    _onViewClick: function() {
      this.setState({
        isLoading: !ShoeStore.getItem(this.props.shoe.id),
        shown: true
      });
    }
  });

});
