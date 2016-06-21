import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap/lib';

import FBImage from './FBImage.react';
import Link from 'components/Link/Link.react';
import Loader from 'components/Loader/Loader.react';

import fbLoader from 'utils/fbLoader';

require('./css/FBFacepile.css');

/**
 * FBFacepile.react
 *
 * Renders a series of linkified profile photos. The name of the person is
 * displayed via tooltip on hover and clicking on the hoto takes the user to
 * the person's profile page.
 */
const FBFacepile = React.createClass({
  displayName: 'FBFacepile',

  propTypes: {
    /**
     * A comma-delimited string of FBIDs. Can also be a single fbid as a
     * number or string.
     */
    friends: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]).isRequired,
  },

  getInitialState() {
    return {
      friends: null,
    };
  },

  componentWillMount() {
    fbLoader(this._getFriends);
  },

  render() {
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

  _renderFace(friend, idx) {
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

  _getFriends() {
    var friends = this.props.friends + '';
    if (!friends) {
      return;
    }

    var fbids = friends.split(',');
    var batch = [];

    // Construct the batch query
    fbids.forEach((fbid) => {
      batch.push({
        method: 'GET',
        relative_url: `${fbid}?fields=name`,
      });
    });

    // Retrieve the public data for each FBID
    FB.getLoginStatus((response) => {
      FB.api('/', 'POST', {batch}, this._parseFriendData);
    });
  },

  _parseFriendData(response) {
    var friends = [];
    response.forEach((data) => {
      if (data.code === 200) {
        friends.push(JSON.parse(data.body));
      }
    });
    this.setState({friends});
  },
});

module.exports = FBFacepile;
