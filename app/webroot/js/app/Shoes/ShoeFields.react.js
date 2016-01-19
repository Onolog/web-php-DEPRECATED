var _ = require('underscore');
var React = require('react');

var BrandSelector = require('./BrandSelector.react');
var FormGroup = require('components/Forms/FormGroup.react');
var TextInput = require('components/Forms/TextInput.react');

var cakePHP = require('utils/cakePHP');

var FIELD_INACTIVE = 'inactive';
var FORM_NAME = 'Shoe';

function encodeName(name) {
  return cakePHP.encodeFormFieldName(name, FORM_NAME);
}

/**
 * ShoeFields.react
 *
 * Displays a form with inputs for adding or editing a shoe.
 */
var ShoeFields = React.createClass({
  displayName: 'ShoeFields',

  propTypes: {
    /**
     * Existing shoe object.
     *
     * Should be kept in the store only, and not used directly in the
     * component.
     */
    shoe: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      shoe: {}
    };
  },

  getInitialState: function() {
    return {
      shoe: this.props.shoe
    };
  },

  render: function() {
    var shoe = this.state.shoe;

    return (
      <div className="form-horizontal workoutForm">
        <FormGroup label="Brand" className="time">
          <BrandSelector
            defaultValue={shoe.brand_id}
            name={encodeName('brand_id')}
            onChange={this._onChange}
          />
        </FormGroup>
        <FormGroup label="Model">
          <TextInput
            defaultValue={shoe.model}
            name={encodeName('model')}
            onChange={this._onChange}
            ref="distance"
          />
        </FormGroup>
        {this._renderInactiveCheckbox()}
      </div>
    );
  },

  _renderInactiveCheckbox: function() {
    // Don't render this input when creating a new shoe, since we assume
    // that all newly created shoes are active. Check props, which is the
    // initial state, rather than state.
    var shoe = this.props.shoe
    if (!_.isEmpty(shoe)) {
      return (
        <FormGroup>
          <div className="checkbox">
            <label>
              <input
                defaultChecked={!!shoe.inactive}
                name={encodeName(FIELD_INACTIVE)}
                onChange={this._onChange}
                type="checkbox"
              />
              Inactive
            </label>
          </div>
        </FormGroup>
      );
    }
  },

  _onChange: function(event) {
    var field = cakePHP.decodeFormFieldName(event.target.name);
    var value = event.target.value;

    if (field === FIELD_INACTIVE) {
      value = +event.target.checked;
    }

    var shoe = _.extend({}, this.state.shoe);
    shoe[field] = value;

    this.setState({shoe: shoe});
    this.props.onChange && this.props.onChange(shoe);
  }
});

module.exports = ShoeFields;
