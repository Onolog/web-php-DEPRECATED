import {isEqual} from 'lodash';
import React, {PropTypes} from 'react';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';

import LeftRight from 'components/LeftRight/LeftRight.react';
import Loader from 'components/Loader/Loader.react';
import ShoeFields from './ShoeFields.react';

import ShoeActions from 'flux/actions/ShoeActions';

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
    const {initialShoe} = this.props;
    const {isLoading, shoe} = this.state;

    let auxButton;
    let primaryAction;
    let title;

    if (initialShoe) {
      auxButton =
        <Button
          bsStyle="danger"
          onClick={this._handleDelete.bind(null, shoe.id)}>
          Delete
        </Button>;
      primaryAction = 'Update';
      title = initialShoe.name;
    } else {
      primaryAction = 'Create';
      title = 'Create A New Shoe';
    }

    return (
      <Modal onHide={this._handleClose} show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && <Loader background full large />}
          <ShoeFields
            isNew={!initialShoe}
            onChange={this._handleChange}
            shoe={shoe}
          />
        </Modal.Body>
        <Modal.Footer>
          <LeftRight>
            {auxButton}
            <ButtonToolbar>
              <Button
                disabled={isLoading}
                onClick={this._handleClose}>
                Cancel
              </Button>
              <Button
                bsStyle="primary"
                disabled={isLoading}
                onClick={this._handleSave}>
                {primaryAction}
              </Button>
            </ButtonToolbar>
          </LeftRight>
        </Modal.Footer>
      </Modal>
    );
  },

  _handleChange(shoe) {
    this.setState({shoe});
  },

  _handleClose() {
    var initialState = this.getInitialState();
    var hasChanges = !isEqual(initialState.shoe, this.state.shoe);
    var confirmed = hasChanges && confirm(
      'Are you sure you want to close the dialog? Your changes will not ' +
      'be saved'
    );

    if (!hasChanges || confirmed) {
      this.setState(initialState);
      this.props.onHide && this.props.onHide();
    }
  },

  _handleDelete(id, e) {
    if (confirm('Are you sure you want to delete this shoe?')) {
      ShoeActions.delete(id);
    }
  },

  _handleSave(e) {
    this.setState({isLoading: true});
    this.props.initialShoe ?
      ShoeActions.save(this.state.shoe) :
      ShoeActions.add(this.state.shoe);
  },
});

module.exports = ShoeModal;
