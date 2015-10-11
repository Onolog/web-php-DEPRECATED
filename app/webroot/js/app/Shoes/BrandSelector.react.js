var React = require('react');

var TextInput = require('../../components/Forms/TextInput.react');
var Select = require('../../components/Select/Select.react');

var BrandStore = require('../../flux/stores/BrandStore');
var StoreMixin = require('../../mixins/StoreMixin.react');

/**
 * BrandSelector.react
 * @jsx React.DOM
 *
 * A selector element that displays all possible shoe brands.
 */
var BrandSelector = React.createClass({
  displayName: 'BrandSelector',

  mixins: [StoreMixin],

  componentWillMount: function() {
    this.stores = [
      this.setStoreInfo(BrandStore, this._setBrands)
    ];

    this._setBrands();
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
        value: +brand.id
      });
    });

    return options;
  }
});

module.exports = BrandSelector;
