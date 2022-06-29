import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, render } from '@testing-library/react';
import { Button } from '../../src/Button';
import { theme } from '../util/theme';

afterEach (cleanup);

describe ('Button', () => {
  it ('empty button', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Button />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('button with text', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Button>Action</Button>
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('submit button', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Button type='submit'>Action</Button>
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
});
