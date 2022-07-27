/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Tab, TabContainer, TabController, TabPanel } from '../../src';
import { theme } from './util/theme';

const tab0 = '[data-testid=tab0]';
const tab1 = '[data-testid=tab1]';
const tab2 = '[data-testid=tab2]';
const tabpanel0 = '[data-testid=tabpanel0]';
const tabpanel1 = '[data-testid=tabpanel1]';
const tabpanel2 = '[data-testid=tabpanel2]';

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
    cy.get (tab0).should ('contain', 'Tab 0');
    cy.get (tab1).should ('contain', 'Tab 1');
    cy.get (tab2).should ('contain', 'Tab 2');

    cy.get (tab0).should ('have.css', 'background-color', 'rgb(0, 0, 255)');
    cy.get (tab1).should ('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get (tab2).should ('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get (tabpanel0).should ('contain', 'TabPanel 0');

    cy.get (tab1).click ();
    cy.get (tab0).should ('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get (tab1).should ('have.css', 'background-color', 'rgb(0, 0, 255)');
    cy.get (tab2).should ('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get (tabpanel1).should ('contain', 'TabPanel 1');

    cy.get (tab2).click ();
    cy.get (tab0).should ('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get (tab1).should ('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get (tab2).should ('have.css', 'background-color', 'rgb(0, 0, 255)');
    cy.get (tabpanel2).should ('contain', 'TabPanel 2');
  });
});
