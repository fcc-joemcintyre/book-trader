/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { MenuDropdown, MenuItem } from '../../src';
import { theme } from './util/theme';

const menu = '[data-testid=menu]';

describe ('MenuDropdown', () => {
  it ('simple menu dropdown', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: '#0000ff' }}>
          <MenuDropdown data-testid='menu'>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </MenuDropdown>
        </div>
      </ThemeProvider>
    );
    cy.get (menu).should ('not.contain.text', 'Item 1');
    cy.get (menu).should ('not.contain.text', 'Item 2');

    cy.get (menu).click ();
    cy.get (menu).should ('contain.text', 'Item 1');
    cy.get (menu).should ('contain.text', 'Item 2');
  });
});
