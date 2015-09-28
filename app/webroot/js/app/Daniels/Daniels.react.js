var Bootstrap = require('../../lib/bootstrap.min');
var React = require('react');

var AppPage = require('../../components/Page/AppPage.react');
var Button = require('../../components/Button/Button.react');
var PageHeader = require('../../components/Page/PageHeader.react');
var Panel = require('../../components/Panel/Panel.react');

var DistanceTable = require('./DistanceTable.react');
var PaceTable = require('./PaceTable.react');

var cx = require('classnames');

require('./Daniels.css');

/**
 * DanielsPage.react
 * @jsx React.DOM
 *
 * Displays Daniels data
 */
var DanielsPage = React.createClass({
  displayName: 'DanielsPage',

  render: function() {
    var sections = [{
    /*
      id: 'calculator',
      label: 'VDOT Calculator',
      title: 'Choose a distance and enter your most recent time',
      contents: 'Calculator',
      active: true
    }, {
    */
      id: 'distances',
      label: 'Distance Table',
      title: 'VDOT Values Associated with Times Raced Over Popular Distances',
      active: true,
      contents: <DistanceTable />
    }, {
      id: 'paces',
      label: 'Training Intensities',
      title: 'Training Intensities Based on Current VDOT',
      contents: <PaceTable />
    }];

    var tabs = sections.map(function(tab) {
      return (
        <li
          className={cx({
            'active': tab.active
          })}
          key={tab.id}>
          <a href={'#' + tab.id} role="tab" data-toggle="tab">
            {tab.label}
          </a>
        </li>
      );
    });

    var panes = sections.map(function(pane) {
      return (
        <div
          key={pane.id}
          className={cx({
            'tab-pane': true,
            'fade': true,
            'in': pane.active,
            'active': pane.active
          })}
          id={pane.id}>
          <h3>{pane.title}</h3>
          {pane.contents}
        </div>
      );
    });

    return (
      <AppPage className="daniels">
        <PageHeader title="Daniels VDOT Resources" />
        <Panel>
          <ul className="nav nav-tabs" role="tablist">
            {tabs}
          </ul>
          <div className="tab-content">
            {panes}
          </div>
        </Panel>
      </AppPage>
    );
  }

});

module.exports = DanielsPage;
