import React from 'react';
import {Button, Modal} from 'react-bootstrap/lib';

import Loader from 'components/Loader/Loader.react';
import ShoeView from './ShoeView.react';

const {PropTypes} = React;

/**
 * ShoeViewModal.react
 */
const ShoeViewModal = React.createClass({
  displayName: 'ShoeViewModal',

  propTypes: {
    onHide: PropTypes.func,
    shoe: PropTypes.object,
    show: PropTypes.bool,
  },

  render: function() {
    const {shoe} = this.props;

    return (
      <Modal onHide={this._handleClose} show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>{shoe.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShoeView
            activities={shoe.activities}
            activityCount={shoe.activity_count}
            mileage={shoe.mileage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this._handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  },

  _handleClose: function() {
    this.props.onHide && this.props.onHide();
  },
});

module.exports = ShoeViewModal;
