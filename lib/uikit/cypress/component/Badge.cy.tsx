/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Badge } from '../../src';
import { theme } from './util/theme';

describe ('Badge', () => {
  it ('default badge', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Badge data-testid='badge'>1</Badge>
      </ThemeProvider>
    );
    cy.get ('[data-testid="badge"]').should ('contain.text', '1');
  });
  it ('custom color badge', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Badge data-testid='badge' c='yellow' bg='red'>1</Badge>
      </ThemeProvider>
    );
    cy.get ('[data-testid="badge"]').should ('contain.text', '1');
    cy.get ('[data-testid="badge"]').should ('have.css', 'color', 'rgb(255, 255, 0)');
    cy.get ('[data-testid="badge"]').should ('have.css', 'background-color', 'rgb(255, 0, 0)');
  });
});
