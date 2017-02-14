import cx from 'classnames';
import {omit} from 'lodash';
import React, {PropTypes} from 'react';
import {MenuItem, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

// `NavDropdown` injects props into all its children, so we need to pass a
// component to make sure non-DOM props don't get passed to the `<li>`.
const MenuArrow = props => <li className="arrow" />;

const AccountNavItem = props => {
  const {arrow, className, onLogout, user, ...otherProps} = props;
  const dropdownProps = omit(otherProps, ['active']);

  return (
    <NavDropdown
      {...dropdownProps}
      className={cx('account-nav-item', {'has-arrow': arrow}, className)}
      id="account-menu">
      {arrow && <MenuArrow />}
      <LinkContainer to={{pathname: `/users/${user.id}`}}>
        <MenuItem>Profile</MenuItem>
      </LinkContainer>
      <LinkContainer to={{pathname: '/settings'}}>
        <MenuItem>Settings</MenuItem>
      </LinkContainer>
      <MenuItem divider />
      <MenuItem onClick={onLogout}>
        Sign Out
      </MenuItem>
    </NavDropdown>
  );
};

AccountNavItem.propTypes = {
  arrow: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

AccountNavItem.defaultProps = {
  arrow: false,
};

export default AccountNavItem;
