import React, {PropTypes} from 'react';
import {Input} from 'react-bootstrap';

import BrandSelector from './BrandSelector.react';
import FormGroup from 'components/Forms/FormGroup.react';
import TextInput from 'components/Forms/TextInput.react';

const FIELD_INACTIVE = 'inactive';

/**
 * ShoeFields.react
 *
 * Displays a form with inputs for adding or editing a shoe.
 */
const ShoeFields = React.createClass({
  displayName: 'ShoeFields',

  propTypes: {
    isNew: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    shoe: PropTypes.object.isRequired,
  },

  render() {
    const {shoe} = this.props;

    return (
      <div className="form-horizontal workoutForm">
        <FormGroup className="time" label="Brand">
          <BrandSelector
            defaultValue={shoe.brand_id}
            name="brand_id"
            onChange={this._handleChange}
          />
        </FormGroup>
        <FormGroup label="Model">
          <TextInput
            name="model"
            onChange={this._handleChange}
            value={shoe.model}
          />
        </FormGroup>
        {this._renderInactiveCheckbox()}
      </div>
    );
  },

  /**
   * Don't render this input when creating a new shoe, since we assume
   * that all newly created shoes are active.
   */
  _renderInactiveCheckbox() {
    const {isNew, shoe} = this.props;

    if (!isNew) {
      return (
        <Input
          checked={!!shoe.inactive}
          label="Inactive"
          name={FIELD_INACTIVE}
          onChange={this._handleChange}
          type="checkbox"
          wrapperClassName="col-sm-9 col-sm-offset-3"
        />
      );
    }
  },

  _handleChange(e) {
    const {checked, name, value} = e.target;
    let shoe = {...this.props.shoe};
    shoe[name] = name === FIELD_INACTIVE ? +checked : value;
    this.props.onChange(shoe);
  },
});

module.exports = ShoeFields;
