var React = require('react');

var LeftRight = require('components/LeftRight/LeftRight.react');
var Link = require('components/Link/Link.react');
var Middot = require('components/Middot.react');

/**
 * AppFooter.react
 */
var AppFooter = React.createClass({
  displayName: 'AppFooter',

  render: function() {
    var date = new Date();

    return (
      <footer className="footer">
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
