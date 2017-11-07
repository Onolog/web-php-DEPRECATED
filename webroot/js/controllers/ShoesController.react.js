import {isEqual, partition} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppFullPage from 'components/Page/AppFullPage.react';
import EmptyState from 'components/EmptyState.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';
import ShoeModal from 'components/Shoes/ShoeModal.react';
import ShoeTable from 'components/Shoes/ShoeTable.react';

import {fetchShoes} from 'actions/shoes';

import 'components/Shoes/css/Shoe.scss';

const mapStateToProps = ({shoes}) => {
  return {
    shoes,
  };
};

/**
 * ShoesController.react
 *
 * View controller for displaying all of a user's shoes
 */
class ShoesController extends React.Component {
  static displayName = 'ShoesController';

  static propTypes = {
    shoes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };

  state = {
    isLoading: false,
    show: false,
  };

  componentWillMount() {
    this._fetchData();
  }

  componentWillReceiveProps(nextProps) {
    // Hide modal when shoes are modified somehow.
    if (!isEqual(this.props.shoes, nextProps.shoes)) {
      this.setState({show: false});
    }

    this.setState({isLoading: false});
  }

  render() {
    const {isLoading, show} = this.state;

    return (
      <AppFullPage title="Shoes">
        <PageHeader full title="Shoes">
          <div>
            <Button bsSize="small" onClick={this._handleShowModal}>
              <MaterialIcon icon="plus" /> New Shoe
            </Button>
            <ShoeModal
              onHide={this._handleHideModal}
              show={show}
            />
          </div>
        </PageHeader>
        <PageFrame fill isLoading={isLoading} scroll>
          {this._renderContent()}
        </PageFrame>
      </AppFullPage>
    );
  }

  _renderContent = () => {
    if (this.state.isLoading) {
      return;
    }

    const shoes = partition(this.props.shoes, 'inactive');

    return (
      <div>
        {this._renderActiveShoes(shoes[1])}
        {this._renderInactiveShoes(shoes[0])}
      </div>
    );
  };

  _renderActiveShoes = (activeShoes) => {
    const contents = activeShoes && activeShoes.length ?
      <ShoeTable fill shoes={activeShoes} /> :
      <EmptyState>
        You do not have any active shoes to display.
      </EmptyState>;

    return (
      <div>
        <h3 className="shoe-type">
          Active
        </h3>
        {contents}
      </div>
    );
  };

  _renderInactiveShoes = (inactiveShoes) => {
    if (inactiveShoes && inactiveShoes.length) {
      return (
        <div>
          <h3 className="shoe-type">
            Inactive
          </h3>
          <ShoeTable fill shoes={inactiveShoes} />
        </div>
      );
    }
  };

  _handleHideModal = () => {
    this.setState({show: false});
  };

  _handleShowModal = () => {
    this.setState({show: true});
  };

  _fetchData = () => {
    this.props.dispatch(fetchShoes());
    this.setState({isLoading: true});
  };
}

module.exports = connect(mapStateToProps)(ShoesController);
