import {range} from 'lodash';
import React, {PropTypes} from 'react';
import {Checkbox, Col, FormControl, FormGroup} from 'react-bootstrap';

import AppForm from 'components/Forms/AppForm.react';
import BrandSelector from './BrandSelector.react';
import FormRow from 'components/Forms/FormGroup.react';

const FIELDS = {
  INACTIVE: 'inactive',
  SIZE: 'size',
};
const SIZE_TYPE = ['US', 'UK', 'Europe'];
const SIZES = {
  0: range(4, 16.5, 0.5).map(size => ({label: size, value: size})),
  1: range(2, 16, 0.5).map(size => ({label: size, value: size})),
  2: range(35, 50).map(size => ({label: size, value: size})),
};

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
    user: PropTypes.object.isRequired,
  },

  render() {
    const {brand_id, model, notes, size, size_type} = this.props.shoe;
    const sizeType = size_type || 0;
    const shoeSizes = SIZES[sizeType];
    if (!size) {
      shoeSizes.unshift({label: '--', value: -1});
    }

    return (
      <AppForm bordered horizontal>
        <FormRow className="time" label="Brand">
          <BrandSelector
            defaultValue={brand_id}
            name="brand_id"
            onChange={this._handleChange}
          />
        </FormRow>
        <FormRow label="Model">
          <FormControl
            name="model"
            onChange={this._handleChange}
            type="text"
            value={model}
          />
        </FormRow>
        <FormRow inline label="Size">
          <FormControl
            componentClass="select"
            name="size_type"
            onChange={this._handleChange}
            value={sizeType}>
            {SIZE_TYPE.map((type, idx) => (
              <option key={idx} value={idx}>{type}</option>
            ))}
          </FormControl>
          {' '}
          <FormControl
            componentClass="select"
            name={FIELDS.SIZE}
            onChange={this._handleChange}
            value={size}>
            {shoeSizes.map(({label, value}) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </FormControl>
        </FormRow>
        <FormRow label="Notes">
          <FormControl
            componentClass="textarea"
            name="notes"
            onChange={this._handleChange}
            value={notes}
          />
        </FormRow>
        {this._renderInactiveCheckbox()}
      </AppForm>
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
        <FormGroup>
          <Col sm={9} smOffset={3}>
            <Checkbox
              checked={!!shoe.inactive}
              name={FIELDS.INACTIVE}
              onChange={this._handleChange}>
              Inactive
            </Checkbox>
          </Col>
        </FormGroup>
      );
    }
  },

  _handleChange(e) {
    const {checked, name, value} = e.target;
    let shoe = {...this.props.shoe};

    switch (name) {
      case FIELDS.INACTIVE:
        shoe[name] = +checked;
        break;
      case FIELDS.SIZE:
        shoe[name] = value === '-1' ? null : value;
        break;
      default:
        shoe[name] = value;
        break;
    }

    this.props.onChange(shoe);
  },
});

module.exports = ShoeFields;
