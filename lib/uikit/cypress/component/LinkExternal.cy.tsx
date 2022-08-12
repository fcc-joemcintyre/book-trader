/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { LinkExternal } from '../../src';
import { theme } from './util/theme';

const link = '[data-testid=link]';

describe ('LinkExternal', () => {
  it ('text default', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div>
          <LinkExternal to='http://www.example.com' data-testid='link'>
            Some text
          </LinkExternal>
        </div>
      </ThemeProvider>
    );
    cy.get (link).should ('contain', 'Some text');
    cy.get (link).should ('have.attr', 'target', '_blank');
    cy.get (link).should ('have.attr', 'rel', 'noopener noreferrer');
    cy.get (link).should ('have.css', 'color', 'rgb(0, 0, 238)');
  });
});
