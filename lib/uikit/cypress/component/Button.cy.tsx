/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../../src/Button';
import { theme } from './util/theme';

describe ('Button.cy.ts', () => {
  it ('default button', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Button>Ok</Button>
      </ThemeProvider>
    );
  });
});
