var React = require('react');

var AppPage = require('../../../components/Page/AppPage.react');
var Button = require('../../../components/Button/Button.react');
var ImageBlock = require('../../../components/Facebook/FBImage.react');
var ImageBlock = require('../../../components/ImageBlock/ImageBlock.react');
var Link = require('../../../components/Link/Link.react');
var Loader = require('../../../components/Loader/Loader.react');
var PageHeader = require('../../../components/Page/PageHeader.react');
var Panel = require('../../../components/Panel/Panel.react');

/**
 * Friends.react
 * @jsx React.DOM
 */
var Friends = React.createClass({
  displayName: 'Friends',

  getInitialState: function() {
    return {
      friends: null
    };
  },

  componentDidMount: function() {
    // Get all friends who are in the system
    FB.getLoginStatus(function(response) {
      FB.api('/me/friends', function(response) {
        this.setState({friends: response.data});
      }.bind(this));
    }.bind(this));
  },

  render: function() {
    return (
      <AppPage className="narrow-page">
        <PageHeader title="Friends" />
        <Panel>
          {this._renderContent()}
        </Panel>
      </AppPage>
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

module.exports = Friends;
