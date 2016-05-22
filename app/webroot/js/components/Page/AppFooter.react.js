import React from 'react';

import LeftRight from 'components/LeftRight/LeftRight.react';
import Link from 'components/Link/Link.react';
import Middot from 'components/Middot.react';

require('./css/AppFooter.css');

/**
 * AppFooter.react
 */
const AppFooter = React.createClass({
  displayName: 'AppFooter',

  render() {
    const date = new Date();

    return (
      <footer className="app-footer">
        <LeftRight className="container-fluid">
          <div>
            Copyright &copy; {date.getFullYear()} Onolog
          </div>
          <div>
            <Link href="/pages/privacy">
              Privacy
            </Link>
            <Middot />
            <Link href="/pages/terms">
              Terms
            </Link>
          </div>
        </LeftRight>
      </footer>
    );
  },
});

module.exports = AppFooter;
