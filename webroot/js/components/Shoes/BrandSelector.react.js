import {omit} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import Select from 'components/Select/Select.react';
import {fetchBrands} from 'actions/brands';

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
class BrandSelector extends React.Component {
  static displayName = 'BrandSelector';

  static propTypes = {
    brands: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  };

  componentWillMount() {
    this.props.dispatch(fetchBrands());
  }

  render() {
    const {brands, ...otherProps} = this.props;
    const selectProps = omit(otherProps, ['dispatch']);
    const options = [];

    brands.forEach((brand) => {
      options.push({
        label: brand.name,
        value: brand.id,
      });
    });

    return (
      <Select
        {...selectProps}
        defaultLabel="Select a brand:"
        disabled={!options.length}
        options={options}
      />
    );
  }
}

export default connect(mapStateToProps)(BrandSelector);
