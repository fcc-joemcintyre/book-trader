/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Pagination } from '../../src';
import { theme } from './util/theme';

const pagination = '[data-testid=pagination]';

describe ('Pagination', () => {
  it ('should show first five pages, first selected', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Pagination
          data-testid='pagination'
          items={100}
          pageItems={10}
          visible={5}
          first={0}
          current={0}
          onChange={() => { /* no op */ }}
        />
      </ThemeProvider>
    );
    cy.get (pagination).should ('contain', '1');
    cy.get (pagination).should ('contain', '2');
    cy.get (pagination).should ('contain', '3');
    cy.get (pagination).should ('contain', '4');
    cy.get (pagination).should ('contain', '5');
    cy.get (pagination).should ('contain', '>');
    cy.get (pagination).should ('not.contain', '6');

    cy.get (pagination).contains ('1').should ('have.css', 'fontWeight', '700');
    cy.get (pagination).contains ('2').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('3').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('4').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('5').should ('have.css', 'fontWeight', '400');
  });
  it ('should show first five pages, third selected', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Pagination
          data-testid='pagination'
          items={100}
          pageItems={10}
          visible={5}
          first={0}
          current={2}
          onChange={() => { /* no op */ }}
        />
      </ThemeProvider>
    );

    cy.get (pagination).contains ('1').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('2').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('3').should ('have.css', 'fontWeight', '700');
    cy.get (pagination).contains ('4').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('5').should ('have.css', 'fontWeight', '400');
  });
  it ('should show first five pages, last selected', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Pagination
          data-testid='pagination'
          items={100}
          pageItems={10}
          visible={5}
          first={0}
          current={4}
          onChange={() => { /* no op */ }}
        />
      </ThemeProvider>
    );

    cy.get (pagination).contains ('1').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('2').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('3').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('4').should ('have.css', 'fontWeight', '400');
    cy.get (pagination).contains ('5').should ('have.css', 'fontWeight', '700');
  });
});
