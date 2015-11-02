var _ = require('underscore');
var React = require('react');

var Button = require('components/Button/Button.react');
var Link = require('components/Link/Link.react');
var Modal = require('components/Modal/Modal.react');
var ShoeFields = require('./ShoeFields.react');

var DialogStore = require('flux/stores/DialogStore');
var ShoeActions = require('flux/actions/ShoeActions');
var ShoeStore = require('flux/stores/ShoeStore');

var LayerMixin = require('mixins/LayerMixin.react');

var cx = require('classnames');

var ActionTypes = require('flux/ActionTypes');

/**
 * ShoeEditLink.react
 * @jsx React.DOM
 *
 * Link that opens a dialog with the editable fields for the shoe.
 */
var ShoeEditLink = React.createClass({
  displayName: 'ShoeEditLink',

  mixins: [LayerMixin],

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
    ShoeStore.bind(ActionTypes.SHOE_UPDATE, this._onShoeUpdate);
  },

  componentWillUnmount: function() {
    ShoeStore.unbind(ActionTypes.SHOE_UPDATE, this._onShoeUpdate);
  },

  _onShoeUpdate: function(shoe) {
    this.setState({
      isLoading: false,
      shoe: shoe,
      shown: false
    });
  },

  render: function() {
    return (
      <Link href="#" onClick={this._onEdit}>
        Edit
      </Link>
    );
  },

  renderLayer: function() {
    var shoe = this.props.initialShoe;
    return (
      <Modal
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

    var confirmed = this.state.hasEdits && confirm(
      'Are you sure you want to close the dialog? Your changes will not ' +
      'be saved'
    );

    if (!this.state.hasEdits || confirmed) {
      this.setState(this.getInitialState());
    }
  },

  _onEdit: function() {
    this.setState({shown: true});
  },

  _onSave: function() {
    this.setState({
      hasEdits: false,
      isLoading: true,
    });
    ShoeActions.save(this.state.shoe);
  },

  _onChange: function(shoe) {
    this.setState({
      hasEdits: true,
      shoe: shoe
    });
  }
});

module.exports = ShoeEditLink;
