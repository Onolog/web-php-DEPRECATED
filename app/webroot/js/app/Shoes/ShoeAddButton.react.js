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
  'stores/DialogStore',
  'utils/cx',
  'lib/underscore/underscore'

], function(

  React,
  ShoeFields,
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
    displayName: 'ShoeAddButton',

    mixins: [LayerMixin, StoreMixin],

    getInitialState: function() {
      return {
        isLoading: false,
        shoe: {},
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
        this.setState(this.getInitialState());
      }
    },

    render: function() {
      return (
        <Button
          glyph="plus"
          onClick={this._openModal}
          label="New Shoe"
        />
      );
    },

    renderLayer: function() {
      return (
        <Modal
          alert={this.state.alert}
          onRequestClose={this._closeModal}
          isLoading={this.state.isLoading}
          shown={this.state.shown}
          size="small"
          title="Add a New Shoe"
          footer={
            <div>
              <Button
                label="Cancel"
                disabled={this.state.isLoading}
                onClick={this._closeModal}
              />
              <Button
                label="Add Shoe"
                use="primary"
                disabled={this.state.isLoading}
                onClick={this._onAddShoeClick}
              />
            </div>
          }>
          <ShoeFields onChange={this._onChange} />
        </Modal>
      );
    },

    _openModal: function() {
      this.setState({shown: true});
    },

    _closeModal: function() {
      if (!this.isMounted()) {
        return;
      }

      var hasEdits = !_.isEqual({}, this.state.shoe);
      var confirmed = hasEdits && confirm(
        'Are you sure you want to close the dialog? Your changes will not ' +
        'be saved'
      );

      if (!hasEdits || confirmed) {
        this.setState(this.getInitialState());
      }
    },

    _onAddShoeClick: function(event) {
      this.setState({ isLoading: true });
      ShoeActions.add(this.state.shoe);
    },

    _onChange: function(shoe) {
      this.setState({shoe: shoe});
    }
  });

});
