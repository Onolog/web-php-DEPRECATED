import {groupBy} from 'lodash';
import React from 'react';
import {Panel} from 'react-bootstrap';

import EmptyState from 'components/EmptyState.react';
import ShoeTable from './ShoeTable.react';

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

  render() {
    let shoes = groupBy(this.props.shoes, 'inactive');

    return (
      <div>
        {this._renderActiveShoes(shoes['0'])}
        {this._renderInactiveShoes(shoes['1'])}
      </div>
    );
  },

  _renderActiveShoes(/*array*/ activeShoes) {
    const contents = activeShoes && activeShoes.length ?
      <ShoeTable fill shoes={activeShoes} /> :
      <EmptyState>
        You do not have any active shoes to display.
      </EmptyState>;

    return (
      <Panel header="Active">
        {contents}
      </Panel>
    );
  },

  _renderInactiveShoes(/*array*/ inactiveShoes) {
    if (inactiveShoes && inactiveShoes.length) {
      return (
        <Panel header="Inactive">
          <ShoeTable fill shoes={inactiveShoes} />
        </Panel>
      );
    }
  },
});

module.exports = AllShoesView;
