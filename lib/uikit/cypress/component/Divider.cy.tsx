/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Divider } from '../../src';
import { theme } from './util/theme';

describe ('Divider', () => {
  it ('default divider', () => {
    mount (
      <ThemeProvider theme={theme}>
        <div style={{ width: '100px', height: '100px' }}>
          <Divider />
        </div>
      </ThemeProvider>
    );
    cy.get ('div > div').should ('have.css', 'width', '100px');
  });
});
