/**
 * Settings.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',

  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Forms/FormGroup.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'lib/react/jsx!components/Select/Select.react',

  'utils/cakePHP',

], function(

  React,
  Button,
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
        <Panel className="form-horizontal">
          <form action={'/users/settings/'} method="post">
            <FormGroup label="First Name">
              <input
                className="form-control"
                defaultValue={user.first_name}
                name={cakePHP.encodeFormFieldName('first_name', FORM_NAME)}
                placeholder="Enter your first name"
                type="text"
              />
            </FormGroup>
            <FormGroup label="Last Name">
              <input
                className="form-control"
                defaultValue={user.last_name}
                name={cakePHP.encodeFormFieldName('last_name', FORM_NAME)}
                placeholder="Enter your last name"
                type="text"
              />
            </FormGroup>
            <FormGroup label="Email Address">
              <input
                className="form-control"
                defaultValue={user.email}
                name={cakePHP.encodeFormFieldName('email', FORM_NAME)}
                placeholder="Enter your email address"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Button use="primary" label="Save Changes" type="submit" />
            </FormGroup>
            <input
              name={cakePHP.encodeFormFieldName('id', FORM_NAME)}
              type="hidden"
              value={user.id}
            />
          </form>
        </Panel>
      );
    }

  });

});
