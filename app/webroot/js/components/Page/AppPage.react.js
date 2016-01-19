var React = require('react');

var AppFooter = require('./AppFooter.react');
var AppHeader = require('./AppHeader.react');
var BaseAppPage = require('./BaseAppPage.react');

var cx = require('classnames');

/**
 * AppPage.react
 */
var AppPage = React.createClass({
  displayName: 'AppPage',

  propTypes: {
    narrow: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      narrow: false
    };
  },

  render: function() {
    var {children, className, narrow} = this.props;

    return (
      <BaseAppPage className={cx({'narrow-page': narrow}, className)}>
        <AppHeader />
        <div className="main">
          <div className="clearfix container">
            <div id="mainCol">
              {children}
            </div>
          </div>
        </div>
        <AppFooter />
      </BaseAppPage>
    );
  }
});

module.exports = AppPage;
