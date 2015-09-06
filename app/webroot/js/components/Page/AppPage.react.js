define([

  'lib/react/react',
  'lib/react/jsx!components/Middot.react',
  'lib/react/jsx!components/Page/AppFooter.react',
  'lib/react/jsx!components/Page/AppHeader.react'

], function(

  React,
  Middot,
  AppFooter,
  AppHeader

) {

  /**
   * AppPage.react
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: 'AppPage',

    render: function() {
      return (
        <div className="app">
          <AppHeader />
          <div className="main">
            <div className="clearfix container">
              <div id="mainCol">
                {this.props.children}
              </div>
            </div>
          </div>
          <AppFooter />
        </div>
      );
    }
  });

});
