import {isEqual, partition} from 'lodash';
import React, {PropTypes} from 'react';
import {Button, Glyphicon, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppPage from 'components/Page/AppPage.react';
import EmptyState from 'components/EmptyState.react';
import Loader from 'components/Loader/Loader.react';
import PageHeader from 'components/Page/PageHeader.react';
import ShoeModal from './ShoeModal.react';
import ShoeTable from './ShoeTable.react';

import {fetchShoes} from 'actions/shoes';

import './css/Shoe.css';

const mapStateToProps = ({shoes}) => {
  return {
    shoes,
  };
};

/**
 * ShoesPage.react
 *
 * View controller for displaying all of a user's shoes
 */
const ShoesPage = React.createClass({
  displayName: 'ShoesPage',

  propTypes: {
    shoes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  },

  componentWillMount() {
    this._fetchData();
  },

  getInitialState() {
    return {
      isLoading: false,
      show: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    // Hide modal when shoes are modified somehow.
    if (!isEqual(this.props.shoes, nextProps.shoes)) {
      this.setState({shoe: false});
    }

    this.setState({isLoading: false});
  },

  render() {
    const shoes = partition(this.props.shoes, 'inactive');

    if (this.state.isLoading) {
      return (
        <AppPage>
          <Loader />
        </AppPage>
      );
    }

    return (
      <AppPage narrow>
        <PageHeader title="Shoes">
          <div>
            <Button onClick={this._handleShowModal}>
              <Glyphicon glyph="plus" /> New Shoe
            </Button>
            <ShoeModal
              onHide={this._handleHideModal}
              show={this.state.show}
            />
          </div>
        </PageHeader>
        {this._renderActiveShoes(shoes[1])}
        {this._renderInactiveShoes(shoes[0])}
      </AppPage>
    );
  },

  _renderActiveShoes(/*array*/ activeShoes) {
    const contents = activeShoes && activeShoes.length ?
      <ShoeTable fill shoes={activeShoes} /> :
      <EmptyState>
        You do not have any active shoes to display.
      </EmptyState>;

    return (
      <Panel header={<h3>Active</h3>}>
        {contents}
      </Panel>
    );
  },

  _renderInactiveShoes(/*array*/ inactiveShoes) {
    if (inactiveShoes && inactiveShoes.length) {
      return (
        <Panel header={<h3>Inactive</h3>}>
          <ShoeTable fill shoes={inactiveShoes} />
        </Panel>
      );
    }
  },

  _handleHideModal() {
    this.setState({show: false});
  },

  _handleShowModal() {
    this.setState({show: true});
  },

  _fetchData() {
    this.props.dispatch(fetchShoes());
    this.setState({isLoading: true});
  },
});

module.exports = connect(mapStateToProps)(ShoesPage);
