/**
 * ShoeFields.react
 * @jsx React.DOM
 *
 * Displays a form with inputs for adding or editing a shoe.
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Shoes/BrandSelector.react',
  'lib/react/jsx!components/Forms/FormGroup.react',
  'lib/react/jsx!components/Forms/TextInput.react',

  'actions/ShoeActions',
  'constants/Shoes',
  'stores/ShoeStore',
  'utils/cakePHP'

], function(

  React,
  BrandSelector,
  FormGroup,
  TextInput,

  ShoeActions,
  SHOES,
  ShoeStore,
  cakePHP

) {

  var FORM_NAME = SHOES.FORM_NAME;
  var FIELD_INACTIVE = 'inactive';

  return React.createClass({
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
        shoe: null
      };
    },

    render: function() {
      var shoe = this.props.shoe;
      return (
        <div className="form-horizontal workoutForm">
          <FormGroup label="Brand" className="time">
            <BrandSelector
              defaultValue={shoe && shoe.brand_id}
              name={cakePHP.encodeFormFieldName('brand_id', FORM_NAME)}
              onChange={this._onUpdate}
            />
          </FormGroup>
          <FormGroup label="Model">
            <TextInput
              defaultValue={shoe && shoe.model}
              name={cakePHP.encodeFormFieldName('model', FORM_NAME)}
              onChange={this._onUpdate}
              ref="distance"
            />
          </FormGroup>
          {this._renderInactiveCheckbox()}
        </div>
      );
    },

    /**
     * Don't render this input when creating a new shoe, since we'll assume
     * that all newly created shoes are active.
     */
    _renderInactiveCheckbox: function() {
      var shoe = this.props.shoe;
      if (shoe) {
        return (
          <FormGroup>
            <div className="checkbox">
              <label>
                <input
                  defaultChecked={!!shoe.inactive}
                  name={cakePHP.encodeFormFieldName(FIELD_INACTIVE, FORM_NAME)}
                  onChange={this._onUpdate}
                  type="checkbox"
                />
                Inactive
              </label>
            </div>
          </FormGroup>
        );
      }
    },

    _onCheckboxUpdate: function() {

      this._onUpdate();
    },

    _onUpdate: function(event) {
      var field = cakePHP.decodeFormFieldName(event.target.name);
      var value = event.target.value;

      if (field === FIELD_INACTIVE) {
        value = +event.target.checked;
      }

      ShoeActions.update(field, value);
    }

  });

});
