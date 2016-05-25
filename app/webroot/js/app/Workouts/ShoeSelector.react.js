import React from 'react';

import Select from 'components/Select/Select.react';

import ActionTypes from 'flux/ActionTypes';
import ShoeActions from 'flux/actions/ShoeActions';
import ShoeStore from 'flux/stores/ShoeStore';

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
    ShoeActions.fetch();
  },

  componentDidMount() {
    ShoeStore.bind(ActionTypes.CHANGE, this._setShoes);
  },

  componentWillUnmount() {
    ShoeStore.unbind(ActionTypes.CHANGE, this._setShoes);
  },

  _setShoes() {
    this.setState({shoes: ShoeStore.getAll()});
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
    let shoes = this.state.shoes.filter(shoe => (
      !shoe.inactive || shoe.id === +this.state.initialSelection
    ));

    let options = [];
    if (shoes && shoes.length) {
      shoes.forEach(shoe => {
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
