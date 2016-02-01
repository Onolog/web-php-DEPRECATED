import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap/lib';

var AllShoesView = require('./AllShoesView.react');
var AppPage = require('components/Page/AppPage.react');
var Loader = require('components/Loader/Loader.react');
var PageHeader = require('components/Page/PageHeader.react');
var ShoeModal = require('./ShoeModal.react');

var ActionTypes = require('flux/ActionTypes');
var ShoeActions = require('flux/actions/ShoeActions');
var ShoeStore = require('flux/stores/ShoeStore');

/**
 * ShoesPage.react
 *
 * View controller for displaying all of a user's shoes
 */
var ShoesPage = React.createClass({
  displayName: 'ShoesPage',

  getInitialState: function() {
    return {
      shoes: null,
      show: false,
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
    this.setState({
      shoes: ShoeStore.getCollection(),
      show: false,
    });
  },

  render: function() {
    const {shoes, show} = this.state;

    return (
      <AppPage narrow>
        <PageHeader title="Shoes">
          <div>
            <Button onClick={this._handleShowModal}>
              <Glyphicon glyph="plus" /> New Shoe
            </Button>
            <ShoeModal
              onHide={this._handleHideModal}
              show={show}
            />
          </div>
        </PageHeader>
        {shoes ? <AllShoesView shoes={shoes} /> : <Loader />}
      </AppPage>
    );
  },

  _handleHideModal: function() {
    this.setState({show: false});
  },

  _handleShowModal: function() {
    this.setState({show: true});
  },
});

module.exports = ShoesPage;
