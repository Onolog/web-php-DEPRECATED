/**
 * Settings.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',

  'lib/react/jsx!components/Forms/FormGroup.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'lib/react/jsx!components/Select/Select.react',

  'utils/cakePHP',

], function(

  React,
  FormGroup,
  Panel,
  Select,
  cakePHP

) {

  var FORM_NAME = 'User';

  return React.createClass({
    displayName: 'Settings',

    propTypes: {
      /**
       * The logged-in user's account info
       */
      user: React.PropTypes.object.isRequired
    },

    render: function() {
      var user = this.props.user;
      return (
        <div>
          <Panel title="Personal Information">
            <FormGroup label="First Name">
              <input
                className="form-control"
                defaultValue={user && user.first_name}
                name={cakePHP.encodeFormFieldName('first_name', FORM_NAME)}
                placeholder="Enter your first name"
                type="text"
              />
            </FormGroup>
            <FormGroup label="Last Name">
              <input
                className="form-control"
                defaultValue={user && user.last_name}
                name={cakePHP.encodeFormFieldName('last_name', FORM_NAME)}
                placeholder="Enter your last name"
                type="text"
              />
            </FormGroup>
            <FormGroup label="Email Address">
              <input
                className="form-control"
                defaultValue={user && user.email}
                name={cakePHP.encodeFormFieldName('email', FORM_NAME)}
                placeholder="Enter your email address"
                type="text"
              />
            </FormGroup>
            <FormGroup label="Member Since">
              <input
                className="form-control"
                defaultValue={user && user.created}
                name={cakePHP.encodeFormFieldName('email', FORM_NAME)}
                placeholder="Enter your email address"
                type="text"
              />
            </FormGroup>
            <FormGroup label="Location">
              <input
                className="form-control"
                defaultValue="Los Altos, CA"
                name={cakePHP.encodeFormFieldName('location', FORM_NAME)}
                placeholder="Where are you located?"
                type="text"
              />
            </FormGroup>
          </Panel>

          <Panel title="Display Preferences">
            <FormGroup label="Distance Units">
              <Select
                name={cakePHP.encodeFormFieldName('units', FORM_NAME)}
                className="form-control"
                onChange={this._onUpdate}
                defaultValue="miles"
                options={[]}
              />
            </FormGroup>
            <FormGroup label="Start Week On">
              <Select
                name={cakePHP.encodeFormFieldName('week_start', FORM_NAME)}
                className="form-control"
                onChange={this._onUpdate}
                defaultValue="0"
                options={[]}
              />
            </FormGroup>
          </Panel>

          <Panel title="Notifications">
            <FormGroup label="Distance Units">
              <Select
                name={cakePHP.encodeFormFieldName('units', FORM_NAME)}
                className="form-control"
                onChange={this._onUpdate}
                defaultValue="miles"
                options={[]}
              />
            </FormGroup>
            <FormGroup label="Start Week On">
              <Select
                name={cakePHP.encodeFormFieldName('week_start', FORM_NAME)}
                className="form-control"
                onChange={this._onUpdate}
                defaultValue="0"
                options={[]}
              />
            </FormGroup>
          </Panel>
        </div>
      );
    }

  });

});
