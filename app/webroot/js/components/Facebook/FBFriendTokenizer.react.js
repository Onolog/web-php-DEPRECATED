/**
 * FriendTokenizer.react
 * @jsx React.DOM
 *
 * FB friend typeahead with name tokenizer
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Tokenizer/Tokenizer.react',
  'facebook'

], function(React, Tokenizer) {

  return React.createClass({
    displayName: 'FBFriendTokenizer',

    propTypes: {
      // Comma-delimited string of FBIDs
      friends: React.PropTypes.string
    },

    getInitialState: function() {
      return {
        taggableFriends: [],
        prePopulate: []
      };
    },

    componentWillMount: function() {
      var friends = this.props.friends + '';
      if (!friends) {
        return;
      }

      var fbids = friends.split(',');

      // Get all taggable friends
      var batch = [{
        method: 'GET',
        relative_url: 'me/friends'
      }];

      // Add any already-tagged friends
      fbids.forEach(function(fbid) {
        batch.push({
          method: 'GET',
          relative_url: fbid + '?fields=name'
        });
      });

      // Get taggable + already tagged FB friends
      FB.getLoginStatus(function(response) {
        FB.api('/', 'POST', {batch: batch}, this._processGraphResponse);
      }.bind(this));
    },

    render: function() {
      return (
        <Tokenizer
          dataSource={this.state.taggableFriends}
          hintText="Type a friend's name..."
          onChange={this._onChange}
          prePopulate={this.state.prePopulate}
          name={this.props.name}
          placeholder="Friends"
        />
      );
    },

    /**
     * Simulate firing an onChange event
     */
    _onChange: function(/*array*/ friends) {
      this.setState({
        prePopulate: friends
      });

      // Convert back to a string when passing the data up to the activity.
      var fbidArr = [];
      friends.forEach(function(friend) {
        fbidArr.push(friend.id);
      });

      this.props.onChange && this.props.onChange({
        target: {
          name: this.props.name,
          value: fbidArr.join(',')
        }
      });
    },

    /**
     * Parse the batched response from the FB Graph API.
     */
    _processGraphResponse: function(response) {
      // The first item in the response is the full list of taggable friends.
      // The other items are friends who are already tagged,
      var taggableFriends = JSON.parse(response.shift().body).data;
      var prePopulate = [];

      response.forEach(function(data) {
        if (data.code === 200) {
          prePopulate.push(JSON.parse(data.body));
        }
      });

      this.setState({
        taggableFriends: taggableFriends,
        prePopulate: prePopulate
      });
    }
  });

});
