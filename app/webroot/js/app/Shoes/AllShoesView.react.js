import React from 'react';
import {OverlayTrigger, Panel, Table, Tooltip} from 'react-bootstrap/lib';

import CloseButton from 'components/Button/CloseButton.react';
import EmptyState from 'components/EmptyState.react';
import Link from 'components/Link/Link.react';
import ShoeModal from './ShoeModal.react';
import ShoeViewModal from './ShoeViewModal.react';

import ShoeActions from 'flux/actions/ShoeActions';

import cx from 'classnames';
import {groupBy} from 'lodash';

const ACTION = {
  EDIT: 'edit',
  VIEW: 'view',
};

/**
 * AllShoesView.react
 *
 * View controller for displaying all of a user's shoes
 */
const AllShoesView = React.createClass({
  displayName: 'AllShoesView',

  propTypes: {
    shoes: React.PropTypes.array.isRequired,
  },

  componentWillReceiveProps: function(nextProps) {
    // Close dialog when shoes get updated.
    this.setState(this.getInitialState());
  },

  getInitialState: function() {
    return {
      action: null,
      shown: null,
    };
  },

  render: function() {
    var shoes = groupBy(this.props.shoes, 'inactive');

    return (
      <div>
        {this._renderActiveShoes(shoes['0'])}
        {this._renderInactiveShoes(shoes['1'])}
      </div>
    );
  },

  _renderActiveShoes: function(/*array*/ activeShoes) {
    var contents;
    if (activeShoes && activeShoes.length) {
      contents = this._renderShoeTable(activeShoes);
    } else {
      contents =
        <EmptyState>
          You do not have any active shoes to display.
        </EmptyState>;
    }

    return (
      <Panel header="Active">
        {contents}
      </Panel>
    );
  },

  _renderInactiveShoes: function(/*array*/ inactiveShoes) {
    if (inactiveShoes && inactiveShoes.length) {
      return (
        <Panel header="Inactive">
          {this._renderShoeTable(inactiveShoes)}
        </Panel>
      );
    }
  },

  _renderShoeTable: function(/*array*/ shoes) {
    return (
      <Table hover fill>
        <thead>
          <tr>
            <th>Name</th>
            <th className="activities">Runs</th>
            <th className="mileage">Miles</th>
            <th colSpan={2} />
          </tr>
        </thead>
        <tbody>
          {shoes.map(this._renderTableRows)}
        </tbody>
      </Table>
    );
  },

  _renderTableRows: function(shoe, idx) {
    let {action, shown} = this.state;

    return (
      <tr className={cx({inactive: !!shoe.inactive})} key={idx}>
        <td>
          <Link href="#" onClick={this._handleView.bind(null, shoe.id)}>
            {shoe.name}
          </Link>
          <ShoeViewModal
            onHide={this._handleHideModal}
            shoe={shoe}
            show={action === ACTION.VIEW && shown === shoe.id}
          />
        </td>
        <td className="activities">
          {shoe.activity_count}
        </td>
        <td className="mileage">
          {shoe.mileage}
        </td>
        <td className="actions">
          <Link href="#" onClick={this._handleEdit.bind(null, shoe.id)}>
            Edit
          </Link>
          <ShoeModal
            initialShoe={shoe}
            onHide={this._handleHideModal}
            show={action === ACTION.EDIT && shown === shoe.id}
          />
        </td>
        <td className="actions">
          <OverlayTrigger
            overlay={<Tooltip id="delete">Delete</Tooltip>}
            placement="top">
            <CloseButton onClick={this._handleDelete.bind(this, shoe.id)} />
          </OverlayTrigger>
        </td>
      </tr>
    );
  },

  _handleDelete: function(id, e) {
    if (confirm('Are you sure you want to delete this shoe?')) {
      ShoeActions.delete(id);
    }
  },

  _handleEdit: function(shoeId, e) {
    e.preventDefault();
    this.setState({
      action: ACTION.EDIT,
      shown: shoeId,
    });
  },

  _handleHideModal: function() {
    this.setState({
      action: null,
      shown: null,
    });
  },

  _handleView: function(shoeId, e) {
    e.preventDefault();
    this.setState({
      action: ACTION.VIEW,
      shown: shoeId,
    });
  },
});

module.exports = AllShoesView;
