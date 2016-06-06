import {find} from 'lodash';
import React, {PropTypes} from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppPage from 'components/Page/AppPage.react';
import PageHeader from 'components/Page/PageHeader.react';
import ShoeView from './ShoeView.react';

import getIdFromPath from 'utils/getIdFromPath';

const mapStoreToProps = ({session, shoes}) => {
  return {
    shoe: find(shoes, {id: getIdFromPath()}),
    viewer: session,
  };
};

/**
 * ShoeViewPage.react
 *
 * Displays the page header and view for a single shoe
 */
const ShoeViewPage = React.createClass({
  displayName: 'ShoeViewPage',

  propTypes: {
    shoe: PropTypes.shape({
      activities: PropTypes.array.isRequired,
      id: PropTypes.number.isRequired,
      mileage: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
    }).isRequired,
    viewer: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  },

  render() {
    const {shoe} = this.props;

    return (
      <AppPage>
        <PageHeader title={shoe.name}>
          {this._renderButtonGroup(shoe)}
        </PageHeader>
        <Panel>
          <ShoeView
            activities={shoe.activities}
            fill
            mileage={shoe.mileage}
          />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup() {
    const {shoe, viewer} = this.props;

    if (viewer.id === shoe.user_id) {
      return (
        <ButtonGroup>
          <OverlayTrigger
            overlay={<Tooltip id="edit">Edit Shoe</Tooltip>}
            placement="top">
            <Button href={`/shoes/edit/${shoe.id}`}>
              <Glyphicon glyph="pencil" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="edit">Delete Shoe</Tooltip>}
            placement="top">
            <Button onClick={this._onShoeDelete}>
              <Glyphicon glyph="trash" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="edit">New Shoe</Tooltip>}
            placement="top">
            <Button href="/shoes/add/">
              <Glyphicon glyph="plus" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="edit">All Shoes</Tooltip>}
            placement="top">
            <Button href="/shoes">
              <Glyphicon glyph="th" />
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      );
    }
  },

  /**
   * TODO: Handle this better...
   */
  _onShoeDelete() {
    if (confirm('Are you sure you want to delete this shoe?')) {
      document.location = `/shoes/delete/${this.props.shoe.id}`;
    }
  },
});

module.exports = connect(mapStoreToProps)(ShoeViewPage);
