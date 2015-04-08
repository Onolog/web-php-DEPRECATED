/**
 * DanielsController.react
 * @jsx React.DOM
 *
 * Displays Daniels data
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Panel.react',

  'lib/react/jsx!app/Daniels/PaceTable.react',
  'lib/react/jsx!app/Daniels/DistanceTable.react',

  'lib/bootstrap.min'

], function(React, Button, Panel, PaceTable, DistanceTable) {

  return React.createClass({

    render: function() {
      var cx = React.addons.classSet;
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
        <Panel>
          <ul className="nav nav-tabs" role="tablist">
            {tabs}
          </ul>
          <div className="tab-content">
            {panes}
          </div>
        </Panel>
      );
    }

  });

});
