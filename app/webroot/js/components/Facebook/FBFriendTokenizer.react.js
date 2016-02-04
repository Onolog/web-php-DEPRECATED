import React from 'react';
import Typeahead from 'react-bootstrap-typeahead';

import fbLoader from 'utils/fbLoader';
import {isArray, map} from 'lodash';

/**
 * FriendTokenizer.react
 *
 * FB friend typeahead with name tokenizer
 */
var FBFriendTokenizer = React.createClass({
  displayName: 'FBFriendTokenizer',

  propTypes: {
    // Comma-delimited string of FBIDs
    friends: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      options: [],
      selected: []
    };
  },

  componentWillMount: function() {
    fbLoader(this._getFriends);
  },

  render: function() {
    var {selected, options} = this.state;

    return (
      <Typeahead
        labelKey="name"
        multiple
        onChange={this._handleChange}
        options={options}
        placeholder="Type a friend's name..."
        selected={selected}
      />
    );
  },

  _getFriends: function() {
    // Get all taggable friends
    var batch = [{
      method: 'GET',
      relative_url: 'me/friends'
    }];

    // Get info for any already-tagged friends
    var {friends} = this.props;
    if (friends) {
      friends.toString().split(',').forEach((fbid) => {
        batch.push({
          method: 'GET',
          relative_url: fbid + '?fields=name'
        });
      });
    }

    // Get taggable + already tagged FB friends
    FB.api('/', 'POST', {batch}, this._handleGraphResponse);
  },

  /**
   * Simulate firing an onChange event
   */
  _handleChange: function(/*array*/ selected) {
    this.setState({selected});

    this.props.onChange && this.props.onChange({
      target: {
        name: this.props.name,
        value: map(selected, 'id').join(',')
      }
    });
  },

  /**
   * Parse the batched response from the FB Graph API.
   */
  _handleGraphResponse: function(response) {
    if (!(response && isArray(response))) {
      return;
    }

    // The first item in the response is the full list of taggable friends.
    // The other items are friends who are already tagged,
    var options = JSON.parse(response.shift().body).data;
    var selected = [];

    response.forEach((data) => {
      if (data.code === 200) {
        selected.push(JSON.parse(data.body));
      }
    });

    this.setState({options, selected});
  }
});

module.exports = FBFriendTokenizer;
