import PropTypes from 'prop-types';
import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

import FBImage from 'components/Facebook/FBImage.react';

import fbLoader from 'utils/fbLoader';
import {isArray, map} from 'lodash';

const IMG_PX = 32;

import 'react-bootstrap-typeahead/css/Token.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './css/FBFriendTokenizer.css';

/**
 * FriendTokenizer.react
 *
 * FB friend typeahead with name tokenizer
 */
const FBFriendTokenizer = React.createClass({
  displayName: 'FBFriendTokenizer',

  propTypes: {
    // Comma-delimited string of FBIDs
    friends: PropTypes.string,
  },

  getInitialState() {
    return {
      options: [],
      selected: [],
    };
  },

  componentWillMount() {
    fbLoader(this._getFriends);
  },

  render() {
    const {selected, options} = this.state;

    return (
      <Typeahead
        labelKey="name"
        multiple
        onChange={this._handleChange}
        options={options}
        placeholder="Type a friend's name..."
        renderMenuItemChildren={this._renderMenuItemChildren}
        selected={selected}
      />
    );
  },

  _renderMenuItemChildren(option, props, idx) {
    return (
      <div className="fb-friend-tokenizer-item">
        <span className="innerBorder">
          <FBImage
            className="fb-friend-tokenizer-item-thumbnail"
            fbid={+option.id}
            height={IMG_PX}
            width={IMG_PX}
          />
        </span>
        <span className="fb-friend-tokenizer-item-name">
          {option.name}
        </span>
      </div>
    );
  },

  _getFriends() {
    // Get all taggable friends
    var batch = [{
      method: 'GET',
      relative_url: 'me/friends',
    }];

    // Get info for any already-tagged friends
    var {friends} = this.props;
    if (friends) {
      friends.toString().split(',').forEach(fbid => {
        batch.push({
          method: 'GET',
          relative_url: `${fbid}?fields=name`,
        });
      });
    }

    // Get taggable + already tagged FB friends
    FB.api('/', 'POST', {batch}, this._handleGraphResponse);
  },

  /**
   * Simulate firing an onChange event
   */
  _handleChange(/*array*/ selected) {
    this.setState({selected});

    this.props.onChange && this.props.onChange({
      target: {
        name: this.props.name,
        value: map(selected, 'id').join(','),
      },
    });
  },

  /**
   * Parse the batched response from the FB Graph API.
   */
  _handleGraphResponse(response) {
    if (!(response && isArray(response))) {
      return;
    }

    // The first item in the response is the full list of taggable friends.
    // The other items are friends who are already tagged,
    var options = JSON.parse(response.shift().body).data;
    var selected = [];

    response.forEach(data => {
      if (data.code === 200) {
        selected.push(JSON.parse(data.body));
      }
    });

    this.setState({options, selected});
  },
});

module.exports = FBFriendTokenizer;
