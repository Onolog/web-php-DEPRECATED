/**
 * Profile.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Panel/Panel.react',

], function(

  React,
  Panel

) {

  return React.createClass({
    displayName: 'Profile',

    propTypes: {
      /* COMING SOON */
    },

    render: function() {
      return (
        <Panel>
          Profile goes here
        </Panel>
      );
    }

  });

});
