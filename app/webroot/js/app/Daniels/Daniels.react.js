var React = require('react');
var {Panel, Tab, Tabs} = require('react-bootstrap/lib');

var AppPage = require('components/Page/AppPage.react');
var DistanceTable = require('./DistanceTable.react');
var PaceTable = require('./PaceTable.react');
var PageHeader = require('components/Page/PageHeader.react');

var cx = require('classnames');

require('./Daniels.css');

/**
 * DanielsPage.react
 *
 * Displays Daniels data
 */
var DanielsPage = React.createClass({
  displayName: 'DanielsPage',

  render: function() {
    return (
      <AppPage className="daniels">
        <PageHeader title="Daniels VDOT Resources" />
        <Panel>
          <Tabs defaultActiveKey={1}>
            <Tab
              eventKey={1}
              title="Distance Table">
              <h3>
                VDOT Values Associated with Times Raced Over Popular Distances
              </h3>
              <DistanceTable />
            </Tab>
            <Tab
              eventKey={2}
              title="Training Intensities">
              <h3>Training Intensities Based on Current VDOT</h3>
              <PaceTable />
            </Tab>
          </Tabs>
        </Panel>
      </AppPage>
    );
  }

});

module.exports = DanielsPage;
