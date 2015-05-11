/**
 * ShoeFields.react
 * @jsx React.DOM
 *
 * Displays a form with inputs for adding or editing a shoe.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Forms/FormGroup.react',
  'lib/react/jsx!components/Select/Select.react',

  'actions/ShoeActions',
  'constants/ActionTypes',
  'constants/Shoes',
  'stores/ShoeStore',
  'utils/cakePHP'

], function(

  React,
  FormGroup,
  Select,
  ShoeActions,
  ActionTypes,
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
        shoe: {}
      };
    },

    componentWillMount: function() {
      // TODO: What's the best way to handle this?
      // ShoeActions.initShoe(this.props.shoe);
    },

    render: function() {
      // Existing shoe data
      var shoe = ShoeStore.getData();

      return (
        <div className="form-horizontal workoutForm">

          <FormGroup label="Brand" className="time">
            <Select
              name={cakePHP.encodeFormFieldName('brand', FORM_NAME)}
              className="form-control"
              onChange={this._onUpdate}
              defaultLabel="Select a shoe:"
              defaultValue={0}
              options={[]}
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
        </div>
      );
    },

    _onUpdate: function(event) {
      ShoeActions.update(
        cakePHP.decodeFormFieldName(event.target.name),
        event.target.value
      );
    }

  });

});
