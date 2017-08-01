import {isEqual} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ShoeAddModal from 'components/Shoes/ShoeAddModal.react';
import ShoeEditModal from 'components/Shoes/ShoeEditModal.react';

import {addShoe, deleteShoe, updateShoe} from 'actions/shoes';

const getInitialState = props => ({
  isLoading: false,
  shoe: props.initialShoe || INITIAL_SHOE_DATA,
});

const mapStateToProps = ({session}) => {
  return {
    user: session,
  };
};

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
class ShoeModal extends React.Component {
  static displayName = 'ShoeModal';

  static propTypes = {
    initialShoe: PropTypes.object,
    onHide: PropTypes.func,
    show: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };

  render() {
    const {initialShoe, show, user} = this.props;
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
      user,
    };

    return initialShoe ?
      <ShoeEditModal
        {...props}
        onDelete={() => this._handleDelete(shoe.id)}
      /> :
      <ShoeAddModal
        {...props}
      />;
  }

  _handleChange = (shoe) => {
    this.setState({shoe});
  };

  _handleClose = () => {
    const {shoe} = getInitialState(this.props);
    const hasChanges = !isEqual(shoe, this.state.shoe);
    const confirmed = hasChanges && confirm(
      'Are you sure you want to close the dialog? Your changes will not ' +
      'be saved'
    );

    if (!hasChanges || confirmed) {
      this.props.onHide && this.props.onHide();
    }
  };

  _handleDelete = (id, e) => {
    if (confirm('Are you sure you want to delete this shoe?')) {
      this.props.dispatch(deleteShoe(id));
    }
  };

  /**
   * Reset the form when the modal closes.
   */
  _handleExited = (e) => {
    this.setState(getInitialState(this.props));
  };

  _handleSave = (e) => {
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
  };
}

module.exports = connect(mapStateToProps)(ShoeModal);
