/* eslint-disable import/first */
import './util/fix';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../../src/Button';
import { theme } from './util/theme';

describe ('Button.cy.ts', () => {
  it ('regular buttons', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Button type='button'>Default</Button>
        <span style={{ marginLeft: '10px' }} />
        <Button type='button' size='xs'>xs</Button>
        <span style={{ marginLeft: '10px' }} />
        <Button type='button' size='sm'>sm</Button>
        <span style={{ marginLeft: '10px' }} />
        <Button type='button' size='md'>md</Button>
        <span style={{ marginLeft: '10px' }} />
        <Button type='button' size='lg'>lg</Button>
      </ThemeProvider>
    );
    cy.get ('button').should ('contain.text', 'Default');
  });
  it ('default submit button', () => {
    mount (
      <ThemeProvider theme={theme}>
        <Button type='submit'>Ok</Button>
      </ThemeProvider>
    );
    cy.get ('button').should ('contain.text', 'Ok');
  });
});
