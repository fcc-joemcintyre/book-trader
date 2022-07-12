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
        <Badge>1</Badge>
      </ThemeProvider>
    );
    cy.get ('div').should ('contain.text', '1');
  });
});
