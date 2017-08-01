import cx from 'classnames';
import {filter} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux';

import Link from 'components/Link/Link.react';
import ShoeModal from './ShoeModal.react';
import ShoeViewModal from './ShoeViewModal.react';

import {fetchShoeActivities} from 'actions/shoes';

const EDIT = 'edit';
const VIEW = 'view';

const getInitialState = props => ({
  action: null,
  shown: null,
});

const mapStateToProps = ({activities}) => {
  return {
    activities,
  };
};

class ShoeTable extends React.Component {
  static displayName = 'ShoeTable';

  static propTypes = {
    activities: PropTypes.array.isRequired,
    shoes: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = getInitialState(props);
  }

  componentWillReceiveProps(nextProps) {
    // Close dialog when shoes get updated.
    if (this.state.action === EDIT) {
      this.setState(getInitialState(nextProps));
    }
  }

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
  }

  _renderRow = shoe => {
    const {activities} = this.props;
    const {action, shown} = this.state;

    return (
      <tr className={cx({inactive: !!shoe.inactive})} key={shoe.id}>
        <td>
          <Link onClick={e => this._handleView(e, shoe)}>
            {shoe.name}
          </Link>
          <ShoeViewModal
            activities={filter(activities, {shoe_id: shoe.id})}
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
          <Link onClick={e => this._handleEdit(e, shoe.id)}>
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
  };

  _handleEdit = (e, shoeId) => {
    this.setState({
      action: EDIT,
      shown: shoeId,
    });
  };

  _handleHideModal = () => {
    this.setState({
      action: null,
      shown: null,
    });
  };

  _handleView = (e, shoe) => {
    this.props.dispatch(fetchShoeActivities(shoe));

    this.setState({
      action: VIEW,
      shown: shoe.id,
    });
  };
}

module.exports = connect(mapStateToProps)(ShoeTable);
