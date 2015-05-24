/**
 * Facepile.react
 * @jsx React.DOM
 *
 * Renders a series of linkified profile photos. The name of the person is
 * displayed via tooltip on hover and clicking on the hoto takes the user to
 * the person's profile page.
 */

define([

  'lib/react/react',
  'lib/react/jsx!components/Image/FBImage.react',
  'lib/react/jsx!components/Link/Link.react'

], function(

  React,
  FBImage,
  Link

) {

  return React.createClass({
    displayName: 'Facepile',

    propTypes: {
      friends: React.PropTypes.array.isRequired
    },

    render: function() {
      var faces = this.props.friends.map(function(friend, idx) {
        return (
          <Link
            className="FacepileLink innerBorder"
            href={'/users/profile/' + friend.id}
            key={idx}
            tooltip={{
              container: 'body',
              title: friend.name
            }}>
            <FBImage fbid={friend.id} />
          </Link>
        );
      });

      return (
        <div className="FacepileContainer">
          {faces}
        </div>
      );
    }
  });

});
