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
      var options = this._getBrandOptions();
      if (!options.length) {
        // Hacky placeholder while we wait for the brands to load.
        // TODO: figure out a better solution?
        return (
          <input
            className="form-control"
            disabled={true}
            type="text"
            value="Select a shoe:"
          />
        );
      }

      return (
        <Select
          {...this.props}
          className="form-control"
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

      // We're adding a new shoe; display a prompt
      if (!this.props.defaultValue) {
        options.unshift({
          label: 'Select a shoe:',
          value: 0
        });
      }

      return options;
    }
  });

});
