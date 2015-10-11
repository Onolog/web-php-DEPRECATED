var _ = require('underscore');
var React = require('react');

var Button = require('../../components/Button/Button.react');
var Link = require('../../components/Link/Link.react');
var Modal = require('../../components/Modal/Modal.react');
var ShoeFields = require('./ShoeFields.react');

var DialogStore = require('../../flux/stores/DialogStore');
var ShoeActions = require('../../flux/actions/ShoeActions');

var LayerMixin = require('../../mixins/LayerMixin.react');
var StoreMixin = require('../../mixins/StoreMixin.react');

var cx = require('classnames');

/**
 * ShoeEditLink.react
 * @jsx React.DOM
 *
 * Link that opens a dialog with the editable fields for the shoe.
 */
var ShoeEditLink = React.createClass({
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

module.exports = ShoeEditLink;
