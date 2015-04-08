/**
 * FriendTokenizer.react
 * @jsx React.DOM
 *
 * FB friend typeahead with name tokenizer
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Tokenizer/Tokenizer.react',

], function(React, Tokenizer) {

  return React.createClass({
    displayName: 'FriendTokenizer',

    propTypes: {
      /**
       * The user's list of friends, for use as a local data source
       */
      friends: React.PropTypes.array
    },

    getInitialState: function() {
      return {
        items: this.props.prePopulate
      };
    },

    render: function() {
      // If there's no local datasource, use a remote one
      var dataSource = '/ajax/users/friends_list/';
      var friends = this.props.friends;
      if (friends && friends.length) {
        dataSource = friends;
      }

      return (
        <Tokenizer
          dataSource={dataSource}
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
