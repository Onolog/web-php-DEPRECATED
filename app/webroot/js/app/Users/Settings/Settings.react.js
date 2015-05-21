/**
 * Settings.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',

  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Forms/FormGroup.react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'lib/react/jsx!components/Forms/TextInput.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'lib/react/jsx!components/Select/Select.react',

  'utils/cakePHP',

], function(

  React,
  Button,
  FormGroup,
  HiddenInput,
  TextInput,
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
        <Panel className="form-horizontal">
          <form action={'/users/settings/'} method="post">
            <FormGroup label="First Name">
              <TextInput
                defaultValue={user.first_name}
                name={cakePHP.encodeFormFieldName('first_name', FORM_NAME)}
                placeholder="Enter your first name"
              />
            </FormGroup>
            <FormGroup label="Last Name">
              <TextInput
                defaultValue={user.last_name}
                name={cakePHP.encodeFormFieldName('last_name', FORM_NAME)}
                placeholder="Enter your last name"
              />
            </FormGroup>
            <FormGroup label="Email Address">
              <TextInput
                defaultValue={user.email}
                name={cakePHP.encodeFormFieldName('email', FORM_NAME)}
                placeholder="Enter your email address"
              />
            </FormGroup>
            <FormGroup label="">
              <Button use="primary" label="Save Changes" type="submit" />
            </FormGroup>
            <HiddenInput
              name={cakePHP.encodeFormFieldName('id', FORM_NAME)}
              value={user.id}
            />
          </form>
        </Panel>
      );
    }

  });

});
