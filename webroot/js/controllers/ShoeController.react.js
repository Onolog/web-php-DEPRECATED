import {find} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Button, ButtonGroup, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppFullPage from 'components/Page/AppFullPage.react';
import Loader from 'components/Loader/Loader.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';
import ShoeView from 'components/Shoes/ShoeView.react';

import {viewShoe} from 'actions/shoes';
import {SHOE_VIEW} from 'constants/ActionTypes';

import 'components/Shoes/css/Shoe.css';

function getIntParam(params, name) {
  return parseInt(params[name], 10);
}

const mapStoreToProps = (state, props) => {
  const {activities, pendingRequests, session, shoes} = state;
  return {
    activities,
    pendingRequests,
    shoe: find(shoes, {id: getIntParam(props.params, 'shoeId')}),
    viewer: session,
  };
};

/**
 * ShoeController.react
 *
 * Displays the view for a single shoe.
 */
class ShoeController extends React.Component {
  static propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object.isRequired),
    shoe: PropTypes.shape({
      activities: PropTypes.array.isRequired,
      id: PropTypes.number.isRequired,
      mileage: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
    }),
    pendingRequests: PropTypes.object.isRequired,
    viewer: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  };

  componentWillMount() {
    const {dispatch, params} = this.props;
    dispatch(viewShoe(getIntParam(params, 'shoeId')));
  }

  render() {
    const {activities, pendingRequests, shoe} = this.props;

    if (!shoe || pendingRequests[SHOE_VIEW]) {
      return (
        <AppFullPage>
          <Loader background full />;
        </AppFullPage>
      );
    }

    return (
      <AppFullPage title={shoe.name}>
        <PageHeader full title={shoe.name}>
          {this._renderButtonGroup(shoe)}
        </PageHeader>
        <PageFrame fill scroll>
          <ShoeView activities={activities} shoe={shoe} />
        </PageFrame>
      </AppFullPage>
    );
  }

  _renderButtonGroup = () => {
    const {shoe, viewer} = this.props;

    if (viewer.id === shoe.user_id) {
      return (
        <ButtonGroup>
          <OverlayTrigger
            overlay={<Tooltip id="edit">Edit Shoe</Tooltip>}
            placement="bottom">
            <Button href={`/shoes/edit/${shoe.id}`}>
              <Glyphicon glyph="pencil" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="delete">Delete Shoe</Tooltip>}
            placement="bottom">
            <Button onClick={this._onShoeDelete}>
              <Glyphicon glyph="trash" />
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      );
    }
  };

  /**
   * TODO: Handle this better...
   */
  _onShoeDelete = () => {
    if (confirm('Are you sure you want to delete this shoe?')) {
      document.location = `/shoes/delete/${this.props.shoe.id}`;
    }
  };
}

module.exports = connect(mapStoreToProps)(ShoeController);
