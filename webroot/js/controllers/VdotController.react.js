import React from 'react';
import {Panel, Tab, Tabs} from 'react-bootstrap/lib';

import AppPage from 'components/Page/AppPage.react';
import DistanceTable from 'components/Vdot/DistanceTable.react';
import PaceTable from 'components/Vdot/PaceTable.react';
import PageHeader from 'components/Page/PageHeader.react';

import 'components/Vdot/Daniels.css';

/**
 * DanielsController.react
 *
 * Displays Daniels data
 */
const DanielsController = props => (
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

module.exports = DanielsController;
