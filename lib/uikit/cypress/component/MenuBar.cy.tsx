/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { MenuBar, MenuItem, MenuSubmenu } from '../../src';
import { theme } from './util/theme';

describe ('Badge', () => {
  it ('simple menu bar', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: '#0000ff' }}>
          <MenuBar data-testid='menubar'>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </MenuBar>
        </div>
      </ThemeProvider>
    );
    cy.get ('[data-testid="menubar"]').should ('contain.text', 'Item 1');
    cy.get ('[data-testid="menubar"]').should ('contain.text', 'Item 2');
  });
  it ('menu bar sub menu', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: '#0000ff' }}>
          <MenuBar data-testid='menubar'>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuSubmenu data-testid='submenu' text='Submenu'>
              <MenuItem>Item 3</MenuItem>
            </MenuSubmenu>
          </MenuBar>
        </div>
      </ThemeProvider>
    );
    cy.get ('[data-testid="menubar"]').should ('contain.text', 'Item 1');
    cy.get ('[data-testid="menubar"]').should ('contain.text', 'Item 2');
    cy.get ('[data-testid="menubar"]').should ('contain.text', 'Submenu');
    cy.get ('[data-testid="menubar"]').should ('not.contain.text', 'Item 3');

    cy.get ('[data-testid="submenu"]').click ();
    cy.get ('[data-testid="menubar"]').should ('contain.text', 'Item 3');
  });
});
