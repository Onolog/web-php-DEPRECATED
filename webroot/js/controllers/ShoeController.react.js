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
import ShoeView from 'components/Shoes/ShoeView.react';

import 'components/Shoes/css/Shoe.css';

const mapStoreToProps = ({activities, session, shoes}, props) => {
  return {
    activities,
    shoe: find(shoes, {id: +props.params.shoeId}),
    viewer: session,
  };
};

/**
 * ShoeController.react
 *
 * Displays the view for a single shoe.
 */
const ShoeController = React.createClass({

  propTypes: {
    activities: PropTypes.arrayOf(PropTypes.object.isRequired),
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
    const {activities, shoe} = this.props;

    return (
      <AppPage narrow>
        <PageHeader title={shoe.name}>
          {this._renderButtonGroup(shoe)}
        </PageHeader>
        <Panel>
          <ShoeView activities={activities} fill shoe={shoe} />
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
            overlay={<Tooltip id="delete">Delete Shoe</Tooltip>}
            placement="top">
            <Button onClick={this._onShoeDelete}>
              <Glyphicon glyph="trash" />
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

module.exports = connect(mapStoreToProps)(ShoeController);
