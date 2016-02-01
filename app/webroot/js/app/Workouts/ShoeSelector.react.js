import React from 'react';

import Select from 'components/Select/Select.react';

import ActionTypes from 'flux/ActionTypes';
import ShoeStore from 'flux/stores/ShoeStore';

import {forEach, groupBy} from 'lodash';

/**
 * ShoeSelector.react
 *
 * HTML selector that displays all of a user's shoes, grouped by activity state.
 */
var ShoeSelector = React.createClass({
  displayName: 'ShoeSelector',

  componentWillMount: function() {
    this._setShoes();
  },

  componentDidMount: function() {
    ShoeStore.bind(ActionTypes.CHANGE, this._setShoes);
  },

  componentWillUnmount: function() {
    ShoeStore.unbind(ActionTypes.CHANGE, this._setShoes);
  },

  _setShoes: function() {
    this.setState({shoes: ShoeStore.getCollection()});
  },

  render: function() {
    return (
      <Select
        {...this.props}
        defaultLabel="Select a shoe:"
        options={this._getOptions()}
      />
    );
  },

  /**
   * Group the list of shoes by active or inactive, and format the data
   * correctly.
   */
  _getOptions: function() {
    var shoes = groupBy(this.state.shoes, 'inactive');
    var active = shoes['0'];

    var options = [];
    if (active && active.length) {
      forEach(active, (shoe) => {
        options.push({
          label: `${shoe.name} (${shoe.mileage} miles)`,
          value: shoe.id
        });
      });
    }
    return options;
  }
});

module.exports = ShoeSelector;
