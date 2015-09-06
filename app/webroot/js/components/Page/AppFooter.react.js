define([

  'lib/react/react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Middot.react'

], function(

  React,
  LeftRight,
  Link,
  Middot

) {

  /**
   * AppFooter.react
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: 'AppFooter',

    render: function() {
      var date = new Date();

      return (
        <footer className="footer">
          <LeftRight className="container">
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
    }
  });

});
