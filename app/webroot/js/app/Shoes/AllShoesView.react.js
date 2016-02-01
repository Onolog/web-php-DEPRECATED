import React from 'react';

import ShoeModal from './ShoeModal.react';
import ShoeViewLink from './ShoeViewLink.react';

import CloseButton from 'components/Button/CloseButton.react';
import EmptyState from 'components/EmptyState.react';
import Link from 'components/Link/Link.react';
import {Panel, Table} from 'react-bootstrap/lib';

import ShoeActions from 'flux/actions/ShoeActions';

import cx from 'classnames';
import {groupBy} from 'lodash';

/**
 * AllShoesView.react
 *
 * View controller for displaying all of a user's shoes
 */
const AllShoesView = React.createClass({
  displayName: 'AllShoesView',

  propTypes: {
    shoes: React.PropTypes.array.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    // Close dialog when shoes get updated.
    this.setState({shownShoe: null});
  },

  getInitialState: function() {
    return {
      shownShoe: null
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
        <EmptyState
          message="You do not have any active shoes to display."
        />;
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
    return (
      <tr className={cx({inactive: !!shoe.inactive})} key={idx}>
        <td>
          <ShoeViewLink shoe={shoe} />
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
            show={this.state.shownShoe === shoe.id}
          />
        </td>
        <td className="actions">
          <CloseButton
            onClick={this._onDeleteClick.bind(this, shoe.id)}
            tooltip={{title: 'Delete'}}
          />
        </td>
      </tr>
    );
  },

  _onDeleteClick: function(id, evt) {
    if (confirm('Are you sure you want to delete this shoe?')) {
      ShoeActions.delete(id);
    }
  },

  _handleEdit: function(shoeId, e) {
    e.preventDefault();
    this.setState({shownShoe: shoeId});
  },

  _handleHideModal: function() {
    this.setState({shownShoe: null});
  },
});

module.exports = AllShoesView;
