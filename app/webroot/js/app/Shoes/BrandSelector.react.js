/**
 * BrandSelector.react
 * @jsx React.DOM
 *
 * A selector element that displays all possible shoe brands.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Select/Select.react',

  'actions/BrandActions',
  'mixins/StoreMixin.react',
  'stores/BrandsStore'

], function(

  React,
  Select,

  BrandActions,
  StoreMixin,
  BrandsStore

) {

  return React.createClass({
    displayName: 'BrandSelector',

    mixins: [StoreMixin],

    getInitialState: function() {
      return {
        brands: BrandsStore.getItems()
      };
    },

    componentWillMount: function() {
      this.stores = [
        this.setStoreInfo(BrandsStore, this._brandsChanged)
      ];

      // Check the store to see if we already have the items so we don't keep
      // re-fetching the data.
      var brands = BrandsStore.getItems();
      if (!brands || !brands.length) {
        BrandActions.fetch();
      }
    },

    _brandsChanged: function() {
      this.setState({
        brands: BrandsStore.getItems()
      });
    },

    render: function() {
      return (
        <Select
          {...this.props}
          className="form-control"
          defaultLabel="Select a shoe:"
          defaultValue={0}
          options={this._getBrandOptions()}
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
