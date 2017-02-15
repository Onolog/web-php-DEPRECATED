import cx from 'classnames';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import NavbarToggle from 'components/Navigation/NavbarToggle.react';

import {toggleSideNav} from 'actions/navigation';

import './css/PageHeader.css';

/**
 * PageHeader
 */
const PageHeader = props => {
  const navbarToggle = props.full ?
    <div className="app-page-header-toggle">
      <NavbarToggle
        className="visible-xs-block"
        onClick={() => props.dispatch(toggleSideNav())}
      />
    </div> :
    null;

  return (
    <header
      className={cx('app-page-header', {
        'app-page-header-full': props.full,
      }, props.className)}>
      {navbarToggle}
      <h2>{props.title}</h2>
      <div className="app-page-header-aux">
        {props.children}
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
},

module.exports = connect()(PageHeader);
