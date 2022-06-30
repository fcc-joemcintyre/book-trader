import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, render } from '@testing-library/react';
import { Divider } from '../../src/Divider';
import { theme } from '../util/theme';

afterEach (cleanup);

describe ('Divider', () => {
  it ('default divider', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Divider />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('divider with margin extended', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Divider extend='4px' />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
});
