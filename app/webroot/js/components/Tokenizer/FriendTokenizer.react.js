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
    displayName: 'FriendTokenizer',

    getInitialState: function() {
      return {
        friends: [],
        items: this.props.prePopulate
      };
    },

    componentWillMount: function() {
      // Get taggable FB friends
      FB.getLoginStatus(function(response) {
        FB.api('/me/friends', function(response) {
          this.setState({friends: response.data});
        }.bind(this));
      }.bind(this));
    },

    render: function() {
      return (
        <Tokenizer
          dataSource={this.state.friends}
          hintText="Type a friend's name..."
          onChange={this._onChange}
          items={this.state.items}
          name={this.props.name}
          placeholder="Friends"
        />
      );
    },

    /**
     * Simulate firing an onChange event
     */
    _onChange: function(/*array*/ items) {
      this.setState({
        items: items
      });

      this.props.onChange && this.props.onChange({
        target: {
          name: this.props.name,
          value: items
        }
      });
    }

  });

});
