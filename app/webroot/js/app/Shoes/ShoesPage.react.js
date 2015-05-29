/**
 * ShoesPage.react
 * @jsx React.DOM
 *
 * View controller for displaying all of a user's shoes
 */
define([

  'lib/react/react',

  'lib/react/jsx!app/Chrome/PageHeader.react',
  'lib/react/jsx!app/Shoes/AllShoesView.react',
  'lib/react/jsx!app/Shoes/ShoeAddButton.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Loader/Loader.react',

  'actions/ShoeActions',
  'constants/ActionTypes',
  'stores/AllShoesStore'

], function(

  React,

  PageHeader,
  AllShoesView,
  ShoeAddButton,
  Button,
  Loader,

  ShoeActions,
  ActionTypes,
  AllShoesStore

) {

  return React.createClass({
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
      AllShoesStore.bind(ActionTypes.CHANGE, this._shoesChanged);
    },

    componentWillUnmount: function() {
      AllShoesStore.unbind(ActionTypes.CHANGE, this._shoesChanged);
    },

    _shoesChanged: function() {
      this.setState({shoes: AllShoesStore.getCollection()});
    },

    render: function() {
      return (
        <div>
          <PageHeader title="Shoes">
            <ShoeAddButton />
          </PageHeader>
          {this._renderContent()}
        </div>
      );
    },

    _renderContent: function() {
      var shoes = this.state.shoes;
      if (!shoes) {
        return <Loader />;
      }
      return <AllShoesView shoes={shoes} />;
    }
  });

});
