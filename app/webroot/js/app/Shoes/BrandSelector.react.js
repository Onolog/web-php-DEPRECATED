var React = require('react');

var Select = require('components/Select/Select.react');

var {CHANGE} = require('flux/ActionTypes');
var BrandStore = require('flux/stores/BrandStore');

/**
 * BrandSelector.react
 *
 * A selector element that displays all possible shoe brands.
 */
var BrandSelector = React.createClass({
  displayName: 'BrandSelector',

  componentWillMount: function() {
    this._setBrands();
  },

  componentDidMount: function() {
    BrandStore.bind(CHANGE, this._setBrands);
  },

  componentWillUnmount: function() {
    BrandStore.unbind(CHANGE, this._setBrands);
  },

  _setBrands: function() {
    this.setState({brands: BrandStore.getCollection()});
  },

  render: function() {
    var options = this._getBrandOptions();
    return (
      <Select
        {...this.props}
        defaultLabel="Select a brand:"
        disabled={!options.length}
        options={options}
      />
    );
  },

  /**
   * Format the brand options correctly
   */
  _getBrandOptions: function() {
    var brands = this.state.brands;
    var options = [];

    brands.forEach(function(brand) {
      options.push({
        label: brand.name,
        value: +brand.id,
      });
    });

    return options;
  },
});

module.exports = BrandSelector;
