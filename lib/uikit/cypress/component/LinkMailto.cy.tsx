/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { LinkMailto } from '../../src';
import { theme } from './util/theme';

const link = '[data-testid=link]';

describe ('LinkMailto', () => {
  it ('default link', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div>
          <LinkMailto to='info@www.example.com' data-testid='link'>
            Some text
          </LinkMailto>
        </div>
      </ThemeProvider>
    );
    cy.get (link).should ('contain', 'Some text');
    cy.get (link).should ('have.attr', 'href', 'mailto:info@www.example.com');
    cy.get (link).should ('have.css', 'color', 'rgb(0, 0, 238)');
  });
  it ('link with specified color', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div>
          <LinkMailto to='info@www.example.com' c='#0000ff' data-testid='link'>
            Some text
          </LinkMailto>
        </div>
      </ThemeProvider>
    );
    cy.get (link).should ('contain', 'Some text');
    cy.get (link).should ('have.attr', 'href', 'mailto:info@www.example.com');
    cy.get (link).should ('have.css', 'color', 'rgb(0, 0, 255)');
  });
});
