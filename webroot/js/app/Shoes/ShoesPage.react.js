import {isEqual} from 'lodash';
import React, {PropTypes} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';

import AllShoesView from './AllShoesView.react';
import AppPage from 'components/Page/AppPage.react';
import PageHeader from 'components/Page/PageHeader.react';
import ShoeModal from './ShoeModal.react';

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

  getInitialState() {
    return {
      show: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    // Hide modal when shoes are modified somehow.
    if (!isEqual(this.props.shoes, nextProps.shoes)) {
      this.setState({show: false});
    }
  },

  render() {
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
        <AllShoesView shoes={this.props.shoes} />
      </AppPage>
    );
  },

  _handleHideModal() {
    this.setState({show: false});
  },

  _handleShowModal() {
    this.setState({show: true});
  },
});

module.exports = connect(mapStateToProps)(ShoesPage);
