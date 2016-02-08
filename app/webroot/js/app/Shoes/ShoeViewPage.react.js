import React from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap/lib';

import AppPage from 'components/Page/AppPage.react';
import PageHeader from 'components/Page/PageHeader.react';
import Panel from 'components/Panel/Panel.react';
import ShoeView from './ShoeView.react';

/**
 * ShoeViewPage.react
 *
 * Displays the page header and view for a single shoe
 */
var ShoeViewPage = React.createClass({
  displayName: 'ShoeViewPage',

  getInitialState: function() {
    var {canEdit, shoe} = window.app;
    return {
      canEdit: canEdit,
      shoe: shoe,
    };
  },

  render: function() {
    var {shoe} = this.state;
    return (
      <AppPage>
        <PageHeader title={shoe.name}>
          {this._renderButtonGroup()}
        </PageHeader>
        <Panel noPadding>
          <ShoeView
            activityCount={shoe.activity_count}
            activities={shoe.activities}
            mileage={shoe.mileage}
          />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup: function() {
    var {canEdit, shoe} = this.state;
    if (canEdit) {
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
  _onShoeDelete: function() {
    if (confirm('Are you sure you want to delete this shoe?')) {
      document.location = '/shoes/delete/' + this.state.shoe.id;
    }
  },
});

module.exports = ShoeViewPage;
