import {isEqual} from 'lodash';
import React from 'react';
import {Button, Modal} from 'react-bootstrap/lib';
import ShoeFields from './ShoeFields.react';

import Loader from 'components/Loader/Loader.react';
import ShoeActions from 'flux/actions/ShoeActions';

const {PropTypes} = React;
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

  getInitialState: function() {
    return {
      isLoading: false,
      shoe: this.props.initialShoe || INITIAL_SHOE_DATA,
    };
  },

  render: function() {
    const {initialShoe} = this.props;
    const {isLoading, shoe} = this.state;

    let primaryAction;
    let title;

    if (initialShoe) {
      primaryAction = 'Update Shoe';
      title = initialShoe.name;
    } else {
      primaryAction = 'Create Shoe';
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
        </Modal.Footer>
      </Modal>
    );
  },

  _handleChange: function(shoe) {
    this.setState({shoe});
  },

  _handleClose: function() {
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

  _handleSave: function(e) {
    this.setState({isLoading: true});
    this.props.initialShoe ?
      ShoeActions.save(this.state.shoe) :
      ShoeActions.add(this.state.shoe);
  },
});

module.exports = ShoeModal;
