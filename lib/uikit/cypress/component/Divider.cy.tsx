/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Divider } from '../../src';
import { theme } from './util/theme';

describe ('Divider', () => {
  it ('default divider', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div style={{ width: '100px', height: '100px' }}>
          <Divider />
        </div>
      </ThemeProvider>
    );
    cy.get ('div > div').should ('have.css', 'width', '100px');
  });
  it ('divider in padded div, default', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div
          data-testid='container'
          style={{
            boxSizing: 'border-box',
            width: '100px',
            height: '100px',
            padding: '4px',
            border: '1px solid black',
          }}
        >
          <Divider data-testid='divider' />
        </div>
      </ThemeProvider>
    );
    cy.get ('[data-testid="container"]').should ('have.css', 'width', '100px');
    cy.get ('[data-testid="divider"]').should ('have.css', 'width', '90px');
  });
  it ('divider in padded div, default', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div
          data-testid='container'
          style={{
            boxSizing: 'border-box',
            width: '100px',
            height: '100px',
            padding: '4px',
            border: '1px solid black',
          }}
        >
          <Divider data-testid='divider' extend='4px' />
        </div>
      </ThemeProvider>
    );
    cy.get ('[data-testid="container"]').should ('have.css', 'width', '100px');
    cy.get ('[data-testid="divider"]').should ('have.css', 'width', '98px');
  });
});
