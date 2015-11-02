import _ from 'underscore';
import React from 'react';

var ShoeEditLink = require('./ShoeEditLink.react');
var ShoeViewLink = require('./ShoeViewLink.react');

var Button = require('components/Button/Button.react');
var CloseButton = require('components/Button/CloseButton.react');
var EmptyState = require('components/EmptyState.react');
var Link = require('components/Link/Link.react');
import {Panel, Table} from 'react-bootstrap/lib';

var ShoeActions = require('flux/actions/ShoeActions');

var cx = require('classnames');

/**
 * AllShoesView.react
 * @jsx React.DOM
 *
 * View controller for displaying all of a user's shoes
 */
var AllShoesView = React.createClass({
  displayName: 'AllShoesView',

  propTypes: {
    shoes: React.PropTypes.array.isRequired
  },

  render: function() {
    var shoes = _.groupBy(this.props.shoes, 'inactive');

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
          <th>Name</th>
          <th className="activities">Runs</th>
          <th className="mileage">Miles</th>
          <th colSpan={2} />
        </thead>
        <tbody>
          {shoes.map(this._renderTableRows)}
        </tbody>
      </Table>
    );
  },

  _renderTableRows: function(shoe, idx) {
    return (
      <tr
        className={cx({
          inactive: !!shoe.inactive
        })}
        key={idx}>
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
          <ShoeEditLink initialShoe={shoe} />
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
  }
});

module.exports = AllShoesView;
