var _ = require('underscore');
var React = require('react');

var Button = require('components/Button/Button.react');
var Link = require('components/Link/Link.react');
var Modal = require('components/Modal/Modal.react');
var ShoeFields = require('./ShoeFields.react');

var DialogStore = require('flux/stores/DialogStore');
var ShoeActions = require('flux/actions/ShoeActions');

var LayerMixin = require('mixins/LayerMixin.react');
var StoreMixin = require('mixins/StoreMixin.react');

var cx = require('classnames');

/**
 * ShoeAddButton.react
 *
 * Button that opens a dialog to add a new shoe.
 */
var ShoeAddButton = React.createClass({
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

module.exports = ShoeAddButton;
