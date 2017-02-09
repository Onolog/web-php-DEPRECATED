import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Glyphicon, Nav, NavItem, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import './css/SideNav.css';

const SideNav = props => (
  <Nav className="app-side-nav" pills stacked>
    {props.children}
  </Nav>
);

const SideNavItem = ({children, className, icon, open, pathname}) => {
  const navItem =
    <LinkContainer to={{pathname}}>
      <NavItem className={cx('app-side-nav-item', className)}>
        {icon}
        <SideNavItemLabel>
          {children}
        </SideNavItemLabel>
      </NavItem>
    </LinkContainer>;

  // Display a tooltip on hover when the nav is collapsed.
  return open ?
    navItem :
    <OverlayTrigger
      overlay={<Tooltip id={children}>{children}</Tooltip>}
      placement="right">
      {navItem}
    </OverlayTrigger>;
};

const SideNavItemLabel = props => (
  <span className="app-side-nav-item-label">
    {props.children}
  </span>
);

const SideNavIcon = props => (
  <Glyphicon className="app-side-nav-item-icon" glyph={props.icon} />
);

SideNavItem.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.node,
  open: PropTypes.bool,
  pathname: PropTypes.string,
};

SideNav.Icon = SideNavIcon;
SideNav.Item = SideNavItem;
SideNav.ItemLabel = SideNavItemLabel;

export default SideNav;
