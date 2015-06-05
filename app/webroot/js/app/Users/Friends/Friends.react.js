/**
 * Friends.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Facebook/FBImage.react',
  'lib/react/jsx!components/ImageBlock/ImageBlock.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Loader/Loader.react',
  'lib/react/jsx!components/Page/PageHeader.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'facebook'

], function(

  React,
  Button,
  FBImage,
  ImageBlock,
  Link,
  Loader,
  PageHeader,
  Panel

) {

  return React.createClass({
    displayName: 'Friends',

    getInitialState: function() {
      return {
        friends: null
      };
    },

    componentWillMount: function() {
      // Get all friends who are in the system
      FB.getLoginStatus(function(response) {
        FB.api('/me/friends', function(response) {
          this.setState({friends: response.data});
        }.bind(this));
      }.bind(this));
    },

    render: function() {
      return (
        <div>
          <PageHeader title="Friends" />
          <Panel>
            {this._renderContent()}
          </Panel>
        </div>
      );
    },

    _renderContent: function() {
      return this.state.friends ? this._renderFriendList() : <Loader />;
    },

    _renderFriendList: function() {
      return this.state.friends.map(function(friend, idx) {
        return (
          <ImageBlock
            align="middle"
            image={
              <Link
                className="innerBorder"
                href={'/users/profile/' + friend.id}>
                <FBImage fbid={friend.id} />
              </Link>
            }
            key={idx}>
            <h4>{friend.name}</h4>
          </ImageBlock>
        );
      }); 
    }
  });

});
