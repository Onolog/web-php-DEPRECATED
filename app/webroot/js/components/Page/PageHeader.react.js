import cx from 'classnames';
import React from 'react';

import LeftRight from 'components/LeftRight/LeftRight.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';

require('./css/PageHeader.css');

/**
 * PageHeader
 */
const PageHeader = (props) => {
  const navbarToggle = props.full ?
    <NavbarToggle className="visible-xs-block" /> : null;

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

module.exports = PageHeader;
