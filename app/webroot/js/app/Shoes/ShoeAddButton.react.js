/**
 * ShoeAddButton.react
 * @jsx React.DOM
 *
 * Button that opens a dialog to add a new shoe.
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Shoes/ShoeFields.react',
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
    displayName: 'ShoeAddButton',

    mixins: [LayerMixin, StoreMixin],

    getInitialState: function() {
      return {
        isLoading: false,
        shoe: null,
        shoeData: null,
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
        <Button
          glyph="plus"
          onClick={this._toggleModal}
          label="New Shoe"
        />
      );
    },

    renderLayer: function() {
      return (
        <Modal
          shown={this.state.shown}
          onRequestClose={this._onCancel}
          isLoading={this.state.isLoading}
          alert={this.state.alert}
          title="Add a New Shoe"
          footer={
            <div>
              <Button
                label="Cancel"
                disabled={this.state.isLoading}
                onClick={this._onCancel}
              />
              <Button
                label="Add Shoe"
                use="primary"
                disabled={this.state.isLoading}
                onClick={this._onAddShoeClick}
              />
            </div>
          }>
          <ShoeFields />
        </Modal>
      );
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

    _onAddShoeClick: function(event) {
      this.setState({ isLoading: true });
      ShoeActions.add(this.state.shoeData);
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
    },
  });

});
