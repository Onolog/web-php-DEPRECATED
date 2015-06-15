/**
 * ShoeSelector.react
 * @jsx React.DOM
 *
 * HTML selector that displays all of a user's shoes, grouped by activity state.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Select/Select.react',
  'constants/ActionTypes',
  'stores/AllShoesStore',
  'utils/ShoeUtils'

], function(

  React,
  Select,
  ActionTypes,
  AllShoesStore,
  ShoeUtils

) {

  function getOptgroupData(/*string*/ label, /*array*/ shoes) /*object*/ {
    var options = [];
    shoes.forEach(function(shoe) {
      options.push({
        label: shoe.name,
        value: shoe.id
      });
    });

    return {
      label: label,
      options: options
    };
  }

  return React.createClass({
    displayName: 'ShoeSelector',

    componentWillMount: function() {
      this._setShoes();
    },

    componentDidMount: function() {
      AllShoesStore.bind(ActionTypes.CHANGE, this._setShoes);
    },

    componentWillUnmount: function() {
      AllShoesStore.unbind(ActionTypes.CHANGE, this._setShoes);
    },

    _setShoes: function() {
      this.setState({shoes: AllShoesStore.getCollection()});
    },

    render: function() {
      var shoes = ShoeUtils.groupByActivity(this.state.shoes);

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
    _getOptions: function() {
      var options = [];
      var shoes = ShoeUtils.groupByActivity(this.state.shoes);

      if (shoes.active.length) {
        options.push(getOptgroupData('Active', shoes.active));
      }

      if (shoes.inactive.length) {
        options.push(getOptgroupData('Inactive', shoes.inactive));
      }

      return options;
    }
  });

});
