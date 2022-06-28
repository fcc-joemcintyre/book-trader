import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, render } from '@testing-library/react';
import { Badge } from '../../src/Badge';
import { theme } from '../util/theme';

afterEach (cleanup);

describe ('Badge', () => {
  it ('empty badge', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Badge />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('numbered badge', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Badge>7</Badge>
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('numbered badge, white on red', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Badge c='#ffffff' bg='#ff0000'>7</Badge>
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
});
