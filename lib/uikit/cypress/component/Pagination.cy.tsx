/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Pagination } from '../../src/Pagination';
import { theme } from './util/theme';

describe ('Pagination.cy.ts', () => {
  it ('playground', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Pagination
          items={100}
          pageItems={10}
          visible={5}
          first={0}
          current={0}
          onChange={() => { /* no op */ }}
        />
      </ThemeProvider>
    );
  });
});
