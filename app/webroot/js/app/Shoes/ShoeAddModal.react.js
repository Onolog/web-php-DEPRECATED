import React, {PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';

import Loader from 'components/Loader/Loader.react';
import ShoeFields from './ShoeFields.react';

/**
 * ShoeAddModal
 *
 * Modal for adding a new shoe.
 */
const ShoeAddModal = React.createClass({
  displayName: 'ShoeAddModal',

  propTypes: {
    isLoading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    shoe: PropTypes.object.isRequired,
    show: PropTypes.bool,
  },

  render() {
    const {isLoading, onChange, onSave, shoe, ...modalProps} = this.props;

    return (
      <Modal {...modalProps}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Shoe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && <Loader background full large />}
          <ShoeFields
            isNew
            onChange={onChange}
            shoe={shoe}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isLoading}
            onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button
            bsStyle="primary"
            disabled={isLoading}
            onClick={onSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  },
});

module.exports = ShoeAddModal;
