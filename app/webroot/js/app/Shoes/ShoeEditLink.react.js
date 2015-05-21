/**
 * ShoeEditLink.react
 * @jsx React.DOM
 *
 * Link that opens a dialog with the editable fields for the shoe.
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Shoes/ShoeFields.react',
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
  ShoeFields,
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
    displayName: 'ShoeEditLink',

    mixins: [LayerMixin, StoreMixin],

    propTypes: {
      shoeID: React.PropTypes.number
    },

    getInitialState: function() {
      return {
        isLoading: false,
        shoe: AllShoesStore.getShoeByID(this.props.shoeID),
        shown: false
      };
    },

    componentWillMount: function() {
      this.stores = [
        this.setStoreInfo(AllShoesStore, this._allShoesChanged),
        this.setStoreInfo(ShoeStore, this._shoeChanged)
      ];
    },

    _allShoesChanged: function() {
      this.setState({
        shoe: AllShoesStore.getShoeByID(this.props.shoeID)
      });
    },

    _shoeChanged: function() {
      var shoe = ShoeStore.getData();
      if (shoe && shoe.id === this.props.shoeID) {
        this.setState({
          isLoading: false,
          shoe: shoe
        });
      } else if (shoe && !shoe.id) {
        // There was either a cancel or successful edit action
        this.setState({
          isLoading: false,
          shown: false
        });
      }
    },

    render: function() {
      return (
        <Link href="javascript:;" onClick={this._onEdit}>
          Edit
        </Link>
      );
    },

    renderLayer: function() {
      var shoe = this.state.shoe;
      return (
        <Modal
          alert={this.state.alert}
          isLoading={this.state.isLoading}
          shown={this.state.shown}
          size="small"
          onRequestClose={this._toggleModal}
          title={shoe.name}
          footer={
            <div>
              <Button
                label="Cancel"
                disabled={this.state.isLoading}
                onClick={this._onCancel}
              />
              <Button
                label="Update Shoe"
                disabled={this.state.isLoading}
                onClick={this._onSave}
                use="primary"
              />
            </div>
          }>
          <ShoeFields shoe={shoe} />
        </Modal>
      );
    },

    _toggleModal: function() {
      if (!this.isMounted()) {
        // Deleting the shoe unmounts the component
        return;
      }

      this.setState({
        isLoading: false,
        shown: !this.state.shown
      });
    },

    _onEdit: function() {
      this._toggleModal();
      ShoeStore.setData(this.state.shoe);
    },

    _onSave: function() {
      this.setState({ isLoading: true });
      ShoeActions.save(this.state.shoe);
    },

    _onCancel: function() {
      var hasEdits = ShoeStore.getHasEdits();
      if (
        !hasEdits ||
        (hasEdits && confirm(
          'Are you sure you want to close the dialog? Your workout will not ' +
          'be saved'
        ))
      ) {
        this._toggleModal();
        ShoeActions.cancel();
      }
    }
  });

});
