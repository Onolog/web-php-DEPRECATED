import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Select from 'components/Select/Select.react';
import {fetchBrandsIfNeeded} from 'actions/brands';

const mapStateToProps = ({brands}) => {
  return {
    brands,
  };
};

/**
 * BrandSelector.react
 *
 * A selector element that displays all possible shoe brands.
 */
const BrandSelector = React.createClass({
  displayName: 'BrandSelector',

  componentWillMount() {
    this.props.dispatch(fetchBrandsIfNeeded());
  },

  propTypes: {
    brands: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  },

  render() {
    const {brands} = this.props;
    const options = [];

    brands.forEach((brand) => {
      options.push({
        label: brand.name,
        value: brand.id,
      });
    });

    return (
      <Select
        {...this.props}
        defaultLabel="Select a brand:"
        disabled={!options.length}
        options={options}
      />
    );
  },
});

module.exports = connect(mapStateToProps)(BrandSelector);
