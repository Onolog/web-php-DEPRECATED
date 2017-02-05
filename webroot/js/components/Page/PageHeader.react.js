import cx from 'classnames';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import LeftRight from 'components/LeftRight/LeftRight.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';

import {toggleSideNav} from 'actions/navigation';

import './css/PageHeader.css';

const mapStateToProps = ({navigation}) => {
  return {
    sideNavOpen: navigation.sideNavOpen,
  };
};

/**
 * PageHeader
 */
const PageHeader = (props) => {
  const navbarToggle = props.full ?
    <NavbarToggle
      className="visible-xs-block"
      onClick={() => props.dispatch(toggleSideNav(props.sideNavOpen))}
    /> : null;

  return (
    <header
      className={cx('app-page-header', {
        'app-page-header-full': props.full,
      }, props.className)}>
      {navbarToggle}
      <LeftRight>
        <h2>{props.title}</h2>
        {props.children}
      </LeftRight>
    </header>
  );
};

PageHeader.propTypes = {
  sideNavOpen: PropTypes.bool.isRequired,
},

module.exports = connect(mapStateToProps)(PageHeader);
