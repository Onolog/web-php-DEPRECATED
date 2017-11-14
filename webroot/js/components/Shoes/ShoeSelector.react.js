import {omit} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import Select from 'components/Select/Select.react';
import {fetchShoes} from 'actions/shoes';

import {convertDistance} from 'utils/distanceUtils';
import formatDistance from 'utils/formatDistance';
import getDistanceUnitString from 'utils/getDistanceUnitString';

import {UNITS} from 'constants/metrics';

const mapStoreToProps = ({session, shoes}) => {
  return {
    shoes,
    units: (session && session.distance_units) || UNITS.MILES,
  };
};

/**
 * ShoeSelector.react
 *
 * HTML selector that displays all of a user's shoes, grouped by activity state.
 */
class ShoeSelector extends React.Component {
  static displayName = 'ShoeSelector';

  static propTypes = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    units: PropTypes.oneOf([
      UNITS.KILOMETERS,
      UNITS.MILES,
    ]).isRequired,
    shoes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      mileage: PropTypes.number.isRequired,
      name: PropTypes.isRequired,
    })),
  };

  state = {
    // TODO: This is kind of a hack.
    initialSelection: this.props.defaultValue,
  };

  componentWillMount() {
    this.props.dispatch(fetchShoes());
  }

  render() {
    const {shoes, value, ...otherProps} = this.props;
    const selectProps = omit(otherProps, ['dispatch']);

    return (
      <Select
        {...selectProps}
        defaultLabel="Select a shoe:"
        options={this._getOptions(shoes)}
        value={value || ''}
      />
    );
  }

  /**
   * Group the list of shoes by active or inactive, and format the data
   * correctly.
   */
  _getOptions = (shoes) => {
    // Filter out inactive shoes unless it's the initially selected shoe.
    shoes = shoes.filter((shoe) => (
      !shoe.inactive || shoe.id === +this.state.initialSelection
    ));

    let options = [];
    if (shoes && shoes.length) {
      const {units} = this.props;

      shoes.forEach((shoe) => {
        const distance = formatDistance(convertDistance(shoe.mileage, units));
        const distanceLabel = getDistanceUnitString(units, true);

        options.push({
          label: `${shoe.name} (${distance} ${distanceLabel})`,
          value: shoe.id,
        });
      });
    }

    return options;
  };
}

export default connect(mapStoreToProps)(ShoeSelector);
