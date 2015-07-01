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
  'stores/DialogStore',
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
  DialogStore,
  cx

) {

  return React.createClass({
    displayName: 'ShoeEditLink',

    mixins: [LayerMixin, StoreMixin],

    propTypes: {
      initialShoe: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        isLoading: false,
        shoe: this.props.initialShoe,
        shown: false
      };
    },

    componentWillMount: function() {
      this.stores = [
        this.setStoreInfo(DialogStore, this._onDialogChange)
      ];
    },

    _onDialogChange: function() {
      if (!DialogStore.getIsShown()) {
        this._closeModal();
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
          onRequestClose={this._closeModal}
          title={shoe.name}
          footer={
            <div>
              <Button
                label="Cancel"
                disabled={this.state.isLoading}
                onClick={this._closeModal}
              />
              <Button
                label="Update Shoe"
                disabled={this.state.isLoading}
                onClick={this._onSave}
                use="primary"
              />
            </div>
          }>
          <ShoeFields
            onChange={this._onChange}
            shoe={shoe}
          />
        </Modal>
      );
    },

    _closeModal: function() {
      if (!this.isMounted()) {
        return;
      }

      var hasEdits = !_.isEqual(this.props.initialShoe, this.state.shoe);
      var confirmed = hasEdits && confirm(
        'Are you sure you want to close the dialog? Your changes will not ' +
        'be saved'
      );

      if (!hasEdits || confirmed) {
        this.setState(this.getInitialState());
      }
    },

    _onEdit: function() {
      this.setState({shown: true});
    },

    _onSave: function() {
      this.setState({isLoading: true});
      ShoeActions.save(this.state.shoe);
    },

    _onChange: function(shoe) {
      this.setState({shoe: shoe});
    }
  });

});
