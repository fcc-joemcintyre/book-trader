/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Tab, TabContainer, TabController, TabPanel } from '../../src';
import { theme } from './util/theme';

describe ('TabController.cy.ts', () => {
  it ('basic tabs', () => {
    mount (
      <ThemeProvider theme={theme}>
        <TabController
          initialValue={0}
        >
          <TabContainer>
            <Tab
              data-testid='tab0'
              value={0}
            >
              <div>Tab 0</div>
            </Tab>
            <Tab
              data-testid='tab1'
              value={1}
            >
              <div>Tab 1</div>
            </Tab>
            <Tab
              data-testid='tab2'
              value={2}
            >
              <div>Tab 2</div>
            </Tab>
          </TabContainer>
          <TabPanel value={0}>
            <div data-testid='tabpanel0'>
              TabPanel 0
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div data-testid='tabpanel1'>
              TabPanel 1
            </div>
          </TabPanel>
          <TabPanel value={2}>
            <div data-testid='tabpanel2'>
              TabPanel 2
            </div>
          </TabPanel>
        </TabController>
      </ThemeProvider>
    );
    cy.get ('[data-testid="tab0"]').should ('contain', 'Tab 0');
    cy.get ('[data-testid="tabpanel0"]').should ('contain', 'TabPanel 0');
  });
});
