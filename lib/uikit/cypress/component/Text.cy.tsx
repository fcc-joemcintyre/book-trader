/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Text } from '../../src';
import { theme } from './util/theme';

describe ('Text', () => {
  it ('text default', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div>
          <Text data-testid='text'>Some text</Text>
        </div>
      </ThemeProvider>
    );
    cy.get ('[data-testid="text"]').should ('contain', 'Some text');
  });
});
