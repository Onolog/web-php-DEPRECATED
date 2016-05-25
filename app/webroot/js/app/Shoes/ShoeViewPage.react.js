import React from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
} from 'react-bootstrap';

import AppPage from 'components/Page/AppPage.react';
import PageHeader from 'components/Page/PageHeader.react';
import ShoeView from './ShoeView.react';

import ShoeStore from 'flux/stores/ShoeStore';
import UserStore from 'flux/stores/UserStore';

function getIdFromPath() {
  const id = document.location.pathname.split('/').pop();
  return parseInt(id, 10);
}

/**
 * ShoeViewPage.react
 *
 * Displays the page header and view for a single shoe
 */
const ShoeViewPage = React.createClass({
  displayName: 'ShoeViewPage',

  render() {
    const shoe = ShoeStore.getSingle(getIdFromPath());

    return (
      <AppPage>
        <PageHeader title={shoe.name}>
          {this._renderButtonGroup(shoe)}
        </PageHeader>
        <Panel>
          <ShoeView
            activities={shoe.activities}
            activityCount={shoe.activity_count}
            fill
            mileage={shoe.mileage}
          />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup(shoe) {
    if (UserStore.getUserId() === shoe.user_id) {
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
    const id = getIdFromPath();
    if (confirm('Are you sure you want to delete this shoe?')) {
      document.location = `/shoes/delete/${id}`;
    }
  },
});

module.exports = ShoeViewPage;
