/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { LinkInternal } from '../../src';
import { theme } from './util/theme';

const link = '[data-testid=link]';

describe ('LinkInternal', () => {
  it ('default link', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div>
          <LinkInternal to='/' data-testid='link'>
            Some text
          </LinkInternal>
        </div>
      </ThemeProvider>
    );
    cy.get (link).should ('contain', 'Some text');
    cy.get (link).should ('have.attr', 'href', '/');
    cy.get (link).should ('have.css', 'color', 'rgb(0, 0, 238)');
  });
});
