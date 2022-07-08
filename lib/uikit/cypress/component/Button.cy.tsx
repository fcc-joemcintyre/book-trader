/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../../src/Button';
import { theme } from './util/theme';

describe ('Button.cy.ts', () => {
  it.only ('default button', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Button c='#00ff00'>Ok</Button>
      </ThemeProvider>
    );
    cy.get ('button').should ('contain.text', 'Ok');
  });
  it ('default submit button', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Button type='submit'>Ok</Button>
      </ThemeProvider>
    );
    cy.get ('button').should ('contain.text', 'Ok');
  });
});
