/**
 * BrandSelector.react
 * @jsx React.DOM
 *
 * A selector element that displays all possible shoe brands.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Forms/TextInput.react',
  'lib/react/jsx!components/Select/Select.react',
  'mixins/StoreMixin.react',
  'stores/BrandStore'

], function(

  React,
  TextInput,
  Select,
  StoreMixin,
  BrandStore

) {

  return React.createClass({
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

});
