import {isEqual} from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import ShoeAddModal from 'app/Shoes/ShoeAddModal.react';
import ShoeEditModal from 'app/Shoes/ShoeEditModal.react';

import {addShoe, deleteShoe, updateShoe} from 'actions/shoes';

const INITIAL_SHOE_DATA = {
  brand_id: '-1',
  inactive: 0,
  model: '',
};

/**
 * ShoeModal.react
 *
 * Modal for adding or editing the properties of a single shoe.
 */
const ShoeModal = React.createClass({
  displayName: 'ShoeModal',

  propTypes: {
    initialShoe: PropTypes.object,
    onHide: PropTypes.func,
    show: PropTypes.bool,
  },

  getInitialState() {
    return {
      isLoading: false,
      shoe: this.props.initialShoe || INITIAL_SHOE_DATA,
    };
  },

  render() {
    const {initialShoe, show} = this.props;
    const {isLoading, shoe} = this.state;

    // Common props.
    const props = {
      isLoading,
      onChange: this._handleChange,
      onExited: this._handleExited,
      onHide: this._handleClose,
      onSave: this._handleSave,
      shoe,
      show,
    };

    return initialShoe ?
      <ShoeEditModal
        {...props}
        onDelete={() => this._handleDelete(shoe.id)}
      /> :
      <ShoeAddModal
        {...props}
      />;
  },

  _handleChange(shoe) {
    this.setState({shoe});
  },

  _handleClose() {
    const {shoe} = this.getInitialState();
    const hasChanges = !isEqual(shoe, this.state.shoe);
    const confirmed = hasChanges && confirm(
      'Are you sure you want to close the dialog? Your changes will not ' +
      'be saved'
    );

    if (!hasChanges || confirmed) {
      this.props.onHide && this.props.onHide();
    }
  },

  _handleDelete(id, e) {
    if (confirm('Are you sure you want to delete this shoe?')) {
      this.props.dispatch(deleteShoe(id));
    }
  },

  /**
   * Reset the form when the modal closes.
   */
  _handleExited(e) {
    this.setState(this.getInitialState());
  },

  _handleSave(e) {
    const action = this.props.initialShoe ? updateShoe : addShoe;
    const {shoe} = this.state;

    if (parseInt(shoe.brand_id, 10) === -1) {
      alert('Please select a brand.');
      return;
    }

    if (!shoe.model) {
      alert('Please enter a model name.');
      return;
    }

    this.setState({isLoading: true});
    this.props.dispatch(action(this.state.shoe));
  },
});

module.exports = connect()(ShoeModal);