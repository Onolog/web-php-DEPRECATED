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
  'mixins/StoreMixin.react',

  'actions/ShoeActions',
  'stores/AllShoesStore',
  'stores/ShoeStore',

  'utils/cx'

], function(

  React,
  ShoeView,
  Button,
  Link,
  Modal,

  LayerMixin,
  StoreMixin,

  ShoeActions,
  AllShoesStore,
  ShoeStore,

  cx

) {

  return React.createClass({
    displayName: 'ShoeViewLink',

    mixins: [LayerMixin, StoreMixin],

    propTypes: {
      shoe: React.PropTypes.object,
      shoeID: React.PropTypes.number.isRequired,
      shoeName: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
      return {
        isLoading: false,
        shoe: null,
        shown: false
      };
    },

    componentWillMount: function() {
      this.stores = [
        this.setStoreInfo(ShoeStore, this._shoeChanged)
      ];
    },

    _shoeChanged: function() {
      var shoe = ShoeStore.getData();
      if (shoe && shoe.id === this.props.shoeID) {
        this.setState({
          isLoading: false,
          shoe: shoe
        });
      }
    },

    render: function() {
      return (
        <Link href="javascript:;" onClick={this._onViewClick}>
          {this.props.shoeName}
        </Link>
      );
    },

    renderLayer: function() {
      return (
        <Modal
          alert={this.state.alert}
          isLoading={this.state.isLoading}
          shown={this.state.shown}
          size="large"
          onRequestClose={this._toggleModal}
          title={this._getDialogTitle()}
          footer={
            <Button
              label="Close"
              disabled={this.state.isLoading}
              onClick={this._toggleModal}
            />
          }>
          {this._renderShoeView()}
        </Modal>
      );
    },

    _getDialogTitle: function() {
      if (this.state.shoe) {
        return this.state.shoe.name;
      }
    },

    _renderShoeView: function() {
      var shoe = this.state.shoe;
      if (shoe && this._isCached()) {
        return (
          <ShoeView
            activities={shoe.activities}
            activityCount={shoe.activity_count}
            mileage={shoe.mileage}
          />
        );
      }
    },

    _toggleModal: function() {
      if (!this.isMounted()) {
        // Deleting the shoe unmounts the component
        return;
      }

      this.setState({
        shown: !this.state.shown,
        isLoading: false,
      });
    },

    _onViewClick: function() {
      this._toggleModal();
      if (!this._isCached()) {
        // Fetch the full set of data if we don't already have it
        this.setState({ isLoading: true });
        ShoeActions.view(this.props.shoeID);
      }
    },

    _isCached: function() {
      return AllShoesStore.getIsCached(this.props.shoeID);
    }
  });

});
