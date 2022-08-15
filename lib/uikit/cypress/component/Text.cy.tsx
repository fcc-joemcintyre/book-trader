/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Text } from '../../src';
import { theme } from './util/theme';

const text = '[data-testid=text]';

describe ('Text', () => {
  it ('text default', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div>
          <Text data-testid='text'>Some text</Text>
        </div>
      </ThemeProvider>
    );
    cy.get (text).should ('contain', 'Some text');
  });
  it ('text named fontsize xxsmall', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div>
          <Text
            data-testid='text'
            fs='xxsmall'
          >
            Some text
          </Text>
        </div>
      </ThemeProvider>
    );
    cy.get (text).should ('contain', 'Some text');
    cy.get (text).should ('have.css', 'font-size', '10px');
  });
  it ('text named fontsize xxlarge', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div>
          <Text
            data-testid='text'
            fs='xxlarge'
          >
            Some text
          </Text>
        </div>
      </ThemeProvider>
    );
    cy.get (text).should ('contain', 'Some text');
    cy.get (text).should ('have.css', 'font-size', '26px');
  });
});
