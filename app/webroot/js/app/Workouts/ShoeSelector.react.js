var React = require('react');

var Select = require('../../components/Select/Select.react');

var ActionTypes = require('../../constants/ActionTypes');
var ShoeStore = require('../../stores/ShoeStore');
var ShoeUtils = require('../../utils/ShoeUtils');

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

/**
 * ShoeSelector.react
 * @jsx React.DOM
 *
 * HTML selector that displays all of a user's shoes, grouped by activity state.
 */
var ShoeSelector = React.createClass({
  displayName: 'ShoeSelector',

  componentWillMount: function() {
    this._setShoes();
  },

  componentDidMount: function() {
    ShoeStore.bind(ActionTypes.CHANGE, this._setShoes);
  },

  componentWillUnmount: function() {
    ShoeStore.unbind(ActionTypes.CHANGE, this._setShoes);
  },

  _setShoes: function() {
    this.setState({shoes: ShoeStore.getCollection()});
  },

  render: function() {
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

module.exports = ShoeSelector;
