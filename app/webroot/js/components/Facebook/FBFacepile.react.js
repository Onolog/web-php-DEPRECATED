var React = require('react');
var {OverlayTrigger, Tooltip} = require('react-bootstrap/lib');

var FBImage = require('./FBImage.react');
var Link = require('components/Link/Link.react');
var Loader = require('components/Loader/Loader.react');

var fbLoader = require('utils/fbLoader');

require('./FBFacepile.css');

/**
 * FBFacepile.react
 *
 * Renders a series of linkified profile photos. The name of the person is
 * displayed via tooltip on hover and clicking on the hoto takes the user to
 * the person's profile page.
 */
var FBFacepile = React.createClass({
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
    fbLoader(this._getFriends);
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
      <OverlayTrigger
        key={idx}
        overlay={<Tooltip id={friend.id}>{friend.name}</Tooltip>}
        placement="top">
        <Link
          className="FacepileLink innerBorder"
          href={`/users/profile/${friend.id}`}>
          <FBImage fbid={friend.id} />
        </Link>
      </OverlayTrigger>
    );
  },

  _getFriends: function() {
    var friends = this.props.friends + '';
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
      FB.api('/', 'POST', {batch: batch}, this._parseFriendData);
    }.bind(this));
  },

  _parseFriendData: function(response) {
    var friends = [];
    response.forEach(function(data) {
      if (data.code === 200) {
        friends.push(JSON.parse(data.body));
      }
    });
    this.setState({friends: friends});
  }
});

module.exports = FBFacepile;
