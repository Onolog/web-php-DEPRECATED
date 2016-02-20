import React from 'react';

import Select from 'components/Select/Select.react';

import ActionTypes from 'flux/ActionTypes';
import ShoeStore from 'flux/stores/ShoeStore';

import {forEach, filter} from 'lodash';

/**
 * ShoeSelector.react
 *
 * HTML selector that displays all of a user's shoes, grouped by activity state.
 */
const ShoeSelector = React.createClass({
  displayName: 'ShoeSelector',

  propTypes: {
    defaultValue: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
  },

  componentWillMount() {
    this._setShoes();
  },

  componentDidMount() {
    ShoeStore.bind(ActionTypes.CHANGE, this._setShoes);
  },

  componentWillUnmount() {
    ShoeStore.unbind(ActionTypes.CHANGE, this._setShoes);
  },

  _setShoes() {
    this.setState({shoes: ShoeStore.getCollection()});
  },

  getInitialState() {
    return {
      // TODO: This is kind of a hack.
      initialSelection: this.props.defaultValue,
      shoes: [],
    };
  },

  render() {
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
  _getOptions() {
    // Filter out inactive shoes unless it's the initially selected shoe.
    let shoes = filter(this.state.shoes, (shoe) => {
      return !shoe.inactive || shoe.id === +this.state.initialSelection;
    });

    var options = [];
    if (shoes && shoes.length) {
      forEach(shoes, (shoe) => {
        options.push({
          label: `${shoe.name} (${shoe.mileage} miles)`,
          value: shoe.id,
        });
      });
    }

    return options;
  },
});

module.exports = ShoeSelector;
