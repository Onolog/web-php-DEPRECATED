/**
 * FBFacepile.react
 * @jsx React.DOM
 *
 * Renders a series of linkified profile photos. The name of the person is
 * displayed via tooltip on hover and clicking on the hoto takes the user to
 * the person's profile page.
 */

define([

  'lib/react/react',
  'lib/react/jsx!components/Facebook/FBImage.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Loader/Loader.react'

], function(

  React,
  FBImage,
  Link,
  Loader

) {

  return React.createClass({
    displayName: 'FBFacepile',

    propTypes: {
      /**
       * A comma-delimited string of FBIDs. Can also be a single fbid as a
       * number or string.
       */
      friends: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]).isRequired
    },

    getInitialState: function() {
      return {
        friends: null
      };
    },

    componentWillMount: function() {
      var friends = this.props.friends;
      if (!friends) {
        return;
      }

      var fbids = friends.split(',');
      var batch = [];

      // Construct the batch query
      fbids.forEach(function(fbid) {
        batch.push({
          method: 'GET',
          relative_url: fbid + '?fields=name'
        });
      });

      // Retrieve the public data for each FBID
      FB.getLoginStatus(function(response) {
        FB.api('/', 'POST', {batch: batch}, this._getFriendData);
      }.bind(this));
    },

    render: function() {
      if (!this.state.friends) {
        return <Loader className="FacepileLoader" />;
      }

      var faces = this.state.friends.map(this._renderFace);
      return (
        <div className="FacepileContainer">
          {faces}
        </div>
      );
    },

    _renderFace: function(friend, idx) {
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
    },

    _getFriendData: function(response) {
      var friends = [];
      response.forEach(function(data) {
        if (data.code === 200) {
          friends.push(JSON.parse(data.body));
        }
      });
      this.setState({friends: friends});
    }
  });

});
