import cx from 'classnames';
import {sortBy} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Table} from 'react-bootstrap';

import Distance from 'components/Distance/Distance.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';

class ShoeTable extends React.Component {
  static displayName = 'ShoeTable';

  static propTypes = {
    activeShoeId: PropTypes.number.isRequired,
    onView: PropTypes.func.isRequired,
    shoes: PropTypes.arrayOf(
      PropTypes.shape({
        activity_count: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        inactive: PropTypes.bool.isRequired,
        mileage: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    order: 'asc',
    sortBy: 'name',
  };

  render() {
    const shoes = sortBy(this.props.shoes, this.state.sortBy);
    if (this.state.order === 'desc') {
      shoes.reverse();
    }

    return (
      <Table hover>
        <thead>
          <tr>
            <th onClick={() => this._handleHeaderClick('name')}>
              Name {this._renderArrow('name')}
            </th>
            <th
              className="activities"
              onClick={() => this._handleHeaderClick('activity_count')}>
              Activities {this._renderArrow('activity_count')}
            </th>
            <th
              className="mileage"
              onClick={() => this._handleHeaderClick('mileage')}>
              <Distance.Label />
              {' '}
              {this._renderArrow('mileage')}
            </th>
          </tr>
        </thead>
        <tbody>
          {shoes.map(this._renderRow)}
        </tbody>
      </Table>
    );
  }

  _renderArrow = (sortBy) => {
    if (this.state.sortBy === sortBy) {
      return (
        <MaterialIcon
          icon={`menu-${this.state.order === 'asc' ? 'up' : 'down'}`}
        />
      );
    }
  }

  _renderRow = (shoe) => {
    const {activeShoeId, onView} = this.props;

    return (
      <tr
        className={cx({
          active: shoe.id === activeShoeId,
          inactive: !!shoe.inactive,
        })}
        key={shoe.id}
        onClick={() => onView(shoe)}>
        <td>
          {shoe.name}
        </td>
        <td className="activities">
          {shoe.activity_count}
        </td>
        <td className="mileage">
          <Distance distance={shoe.mileage} label={false} />
        </td>
      </tr>
    );
  }

  _handleHeaderClick = (sortBy) => {
    let order;
    if (this.state.sortBy === sortBy) {
      order = this.state.order === 'asc' ? 'desc' : 'asc';
    } else if (sortBy === 'name') {
      order = 'asc';
    } else {
      order = 'desc';
    }

    this.setState({order, sortBy});
  }
}

export default ShoeTable;
