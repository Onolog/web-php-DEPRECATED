import cx from 'classnames';
import {filter, find, isEqual, partition} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppFullPage from 'components/Page/AppFullPage.react';
import EmptyState from 'components/EmptyState.react';
import LeftRight from 'components/LeftRight/LeftRight.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';
import ScrollContainer from 'components/ScrollContainer/ScrollContainer.react';
import ShoeModal from 'components/Shoes/ShoeModal.react';
import ShoeTable from 'components/Shoes/ShoeTable.react';
import ShoeView from 'components/Shoes/ShoeView.react';

import {fetchShoeActivities, fetchShoes} from 'actions/shoes';

import 'components/Shoes/css/Shoe.scss';

const mapStateToProps = ({activities, shoes}) => {
  return {
    activities,
    shoes,
  };
};

const SectionHeader = (props) => (
  <h3 className={cx('section-header', props.className)}>
    {props.children}
  </h3>
);

/**
 * ShoesController.react
 *
 * View controller for displaying all of a user's shoes
 */
class ShoesController extends React.Component {
  static displayName = 'ShoesController';

  static propTypes = {
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        shoe_id: PropTypes.number.isRequired,
      })
    ).isRequired,
    shoes: PropTypes.arrayOf(
      PropTypes.shape({
        activity_count: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    activeShoeId: 0,
    isLoading: false,
    shoe: null,
    show: false,
  };

  componentWillMount() {
    this.props.dispatch(fetchShoes());
    this.setState({isLoading: true});
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
          </div>
        </PageHeader>
        <PageFrame fill isLoading={isLoading}>
          {this._renderContent()}
          <ShoeModal
            initialShoe={this.state.shoe}
            onHide={this._handleHideModal}
            show={show}
          />
        </PageFrame>
      </AppFullPage>
    );
  }

  _renderContent = () => {
    if (this.state.isLoading) {
      return;
    }

    const [inactive, active] = partition(this.props.shoes, 'inactive');

    return (
      <div className="shoes-container">
        <ScrollContainer className="shoe-list-container">
          {this._renderActiveShoes(active)}
          {this._renderInactiveShoes(inactive)}
        </ScrollContainer>
        <ScrollContainer className="shoe-details">
          {this._renderShoeDetails()}
        </ScrollContainer>
      </div>
    );
  }

  _renderActiveShoes = (activeShoes) => {
    const contents = activeShoes && activeShoes.length ?
      <ShoeTable
        activeShoeId={this.state.activeShoeId}
        onView={this._handleShoeView}
        shoes={activeShoes}
      /> :
      <EmptyState>
        You do not have any active shoes to display.
      </EmptyState>;

    return (
      <div>
        <SectionHeader className="shoe-type">
          Active
        </SectionHeader>
        {contents}
      </div>
    );
  }

  _renderInactiveShoes = (inactiveShoes) => {
    if (inactiveShoes && inactiveShoes.length) {
      return (
        <div>
          <SectionHeader className="shoe-type">
            Inactive
          </SectionHeader>
          <ShoeTable
            activeShoeId={this.state.activeShoeId}
            onView={this._handleShoeView}
            shoes={inactiveShoes}
          />
        </div>
      );
    }
  }

  _renderShoeDetails = () => {
    const {activeShoeId} = this.state;

    if (!activeShoeId) {
      return (
        <EmptyState>
          No shoe selected.
        </EmptyState>
      );
    }

    const activities = filter(this.props.activities, {shoe_id: activeShoeId});
    const shoe = find(this.props.shoes, {id: activeShoeId});

    return [
      <div className="shoe-details-header" key="header">
        <LeftRight>
          <h4>{shoe.name}</h4>
          <Button bsSize="small" onClick={() => this._handleShoeEdit(shoe)}>
            <MaterialIcon icon="pencil" />
          </Button>
        </LeftRight>
      </div>,
      <ShoeView
        activities={activities}
        isLoading={activities.length !== shoe.activity_count}
        key="view"
        shoe={shoe}
      />,
    ];
  }

  _handleHideModal = () => {
    this.setState({
      shoe: null,
      show: false,
    });
  }

  _handleShoeEdit = (shoe) => {
    this.setState({
      shoe,
      show: true,
    });
  }

  _handleShoeView = (shoe) => {
    this.props.dispatch(fetchShoeActivities(shoe));
    this.setState({activeShoeId: shoe.id});
  }

  _handleShowModal = () => {
    this.setState({show: true});
  }
}

module.exports = connect(mapStateToProps)(ShoesController);
