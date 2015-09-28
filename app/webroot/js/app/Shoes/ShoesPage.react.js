var React = require('react');

var AllShoesView = require('./AllShoesView.react');
var AppPage = require('../../components/Page/AppPage.react');
var Button = require('../../components/Button/Button.react');
var Loader = require('../../components/Loader/Loader.react');
var PageHeader = require('../../components/Page/PageHeader.react');
var ShoeAddButton = require('./ShoeAddButton.react');

var ActionTypes = require('../../constants/ActionTypes');
var ShoeActions = require('../../actions/ShoeActions');
var ShoeStore = require('../../stores/ShoeStore');

/**
 * ShoesPage.react
 * @jsx React.DOM
 *
 * View controller for displaying all of a user's shoes
 */
var ShoesPage = React.createClass({
  displayName: 'ShoesPage',

  getInitialState: function() {
    return {
      shoes: null
    };
  },

  componentWillMount: function() {
    ShoeActions.fetch();
  },

  componentDidMount: function() {
    ShoeStore.bind(ActionTypes.CHANGE, this._shoesChanged);
  },

  componentWillUnmount: function() {
    ShoeStore.unbind(ActionTypes.CHANGE, this._shoesChanged);
  },

  _shoesChanged: function() {
    this.setState({shoes: ShoeStore.getCollection()});
  },

  render: function() {
    return (
      <AppPage narrow>
        <PageHeader title="Shoes">
          <ShoeAddButton />
        </PageHeader>
        {this._renderContent()}
      </AppPage>
    );
  },

  _renderContent: function() {
    var shoes = this.state.shoes;
    return shoes ? <AllShoesView shoes={shoes} /> : <Loader />;
  }
});

module.exports = ShoesPage;
