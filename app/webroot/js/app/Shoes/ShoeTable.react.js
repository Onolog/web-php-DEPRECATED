import cx from 'classnames';
import React from 'react';
import {Table} from 'react-bootstrap';

import Link from 'components/Link/Link.react';
import ShoeModal from './ShoeModal.react';
import ShoeViewModal from './ShoeViewModal.react';

const EDIT = 'edit';
const VIEW = 'view';

const ShoeTable = React.createClass({
  displayName: 'ShoeTable',

  propTypes: {
    shoes: React.PropTypes.array.isRequired,
  },

  componentWillReceiveProps(nextProps) {
    // Close dialog when shoes get updated.
    this.setState(this.getInitialState());
  },

  getInitialState() {
    return {
      action: null,
      shown: null,
    };
  },

  render() {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th className="activities">Activities</th>
            <th className="mileage">Miles</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.shoes.map(this._renderRow)}
        </tbody>
      </Table>
    );
  },

  _renderRow(shoe, idx) {
    const {action, shown} = this.state;

    return (
      <tr className={cx({inactive: !!shoe.inactive})} key={idx}>
        <td>
          <Link href="#" onClick={this._handleView.bind(null, shoe.id)}>
            {shoe.name}
          </Link>
          <ShoeViewModal
            onHide={this._handleHideModal}
            shoe={shoe}
            show={action === VIEW && shown === shoe.id}
          />
        </td>
        <td className="activities">
          {shoe.activity_count}
        </td>
        <td className="mileage">
          {shoe.mileage}
        </td>
        <td className="actions">
          <Link href="#" onClick={this._handleEdit.bind(null, shoe.id)}>
            Edit
          </Link>
          <ShoeModal
            initialShoe={shoe}
            onHide={this._handleHideModal}
            show={action === EDIT && shown === shoe.id}
          />
        </td>
      </tr>
    );
  },

  _handleEdit(shoeId, e) {
    e.preventDefault();
    this.setState({
      action: EDIT,
      shown: shoeId,
    });
  },

  _handleHideModal() {
    this.setState({
      action: null,
      shown: null,
    });
  },

  _handleView(shoeId, e) {
    e.preventDefault();
    this.setState({
      action: VIEW,
      shown: shoeId,
    });
  },
});

module.exports = ShoeTable;
