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

  'actions/ShoeActions',
  'constants/Shoes',
  'stores/ShoeStore',
  'utils/cakePHP'

], function(

  React,
  BrandSelector,
  FormGroup,

  ShoeActions,
  SHOES,
  ShoeStore,
  cakePHP

) {

  var FORM_NAME = SHOES.FORM_NAME;

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
      return (
        <div className="form-horizontal workoutForm">
          <FormGroup label="Brand" className="time">
            <BrandSelector
              name={cakePHP.encodeFormFieldName('brand_id', FORM_NAME)}
              onChange={this._onUpdate}
            />
          </FormGroup>
          <FormGroup label="Model">
            <input
              className="form-control"
              name={cakePHP.encodeFormFieldName('model', FORM_NAME)}
              onChange={this._onUpdate}
              ref="distance"
              type="text"
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
      if (this.props.shoe) {
        return (
          <FormGroup>
            <div className="checkbox">
              <label>
                <input
                  name={cakePHP.encodeFormFieldName('inactive', FORM_NAME)}
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

    _onUpdate: function(event) {
      ShoeActions.update(
        cakePHP.decodeFormFieldName(event.target.name),
        event.target.value
      );
    }

  });

});
