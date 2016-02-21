import React from 'react';
import {Input} from 'react-bootstrap';

import BrandSelector from './BrandSelector.react';
import FormGroup from 'components/Forms/FormGroup.react';
import TextInput from 'components/Forms/TextInput.react';

import {clone} from 'lodash';

const FIELD_INACTIVE = 'inactive';

/**
 * ShoeFields.react
 *
 * Displays a form with inputs for adding or editing a shoe.
 */
const ShoeFields = React.createClass({
  displayName: 'ShoeFields',

  propTypes: {
    isNew: React.PropTypes.bool,
    shoe: React.PropTypes.object.isRequired,
  },

  render: function() {
    const {shoe} = this.props;

    return (
      <div className="form-horizontal workoutForm">
        <FormGroup label="Brand" className="time">
          <BrandSelector
            defaultValue={shoe.brand_id}
            name="brand_id"
            onChange={this._handleChange}
          />
        </FormGroup>
        <FormGroup label="Model">
          <TextInput
            defaultValue={shoe.model}
            name="model"
            onChange={this._handleChange}
            ref="distance"
          />
        </FormGroup>
        {this._renderInactiveCheckbox()}
      </div>
    );
  },

  _renderInactiveCheckbox: function() {
    const {isNew, shoe} = this.props;

    // Don't render this input when creating a new shoe, since we assume
    // that all newly created shoes are active.
    if (!isNew) {
      return (
        <Input
          defaultChecked={!!shoe.inactive}
          label="Inactive"
          name={FIELD_INACTIVE}
          onChange={this._handleChange}
          type="checkbox"
          wrapperClassName="col-sm-9 col-sm-offset-3"
        />
      );
    }
  },

  _handleChange: function(e) {
    var {checked, name, value} = e.target;
    if (name === FIELD_INACTIVE) {
      value = +checked;
    }

    var shoe = clone(this.props.shoe);
    shoe[name] = value;

    this.props.onChange && this.props.onChange(shoe);
  },
});

module.exports = ShoeFields;
