import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Select from 'components/Select/Select.react';
import {fetchShoes} from 'actions/shoes';

const mapStoreToProps = ({shoes}) => {
  return {
    shoes,
  };
};

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
    shoes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      mileage: PropTypes.number.isRequired,
      name: PropTypes.isRequired,
    })),
  },

  componentWillMount() {
    this.props.dispatch(fetchShoes());
  },

  getInitialState() {
    return {
      // TODO: This is kind of a hack.
      initialSelection: this.props.defaultValue,
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
    let shoes = this.props.shoes.filter(shoe => (
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

module.exports = connect(mapStoreToProps)(ShoeSelector);
