/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Pagination } from '../../src';
import { theme } from './util/theme';

describe ('Pagination.cy.ts', () => {
  it ('should show first five pages', () => {
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
    cy.get ('[data-testid="pagination"]').should ('contain', '1');
    cy.get ('[data-testid="pagination"]').should ('contain', '2');
    cy.get ('[data-testid="pagination"]').should ('contain', '3');
    cy.get ('[data-testid="pagination"]').should ('contain', '4');
    cy.get ('[data-testid="pagination"]').should ('contain', '5');
    cy.get ('[data-testid="pagination"]').should ('contain', '>');
    cy.get ('[data-testid="pagination"]').should ('not.contain', '6');
  });
});
