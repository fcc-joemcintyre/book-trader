import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, render } from '@testing-library/react';
import { Pagination } from '../../src/Pagination';
import { theme } from '../util/theme';

afterEach (cleanup);

describe ('Pagination', () => {
  it ('2 elements, first is current', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Pagination items={20} pageItems={10} visible={5} first={0} current={0} onChange={() => { /* no op */ }} />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('2 elements, second is current', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Pagination items={20} pageItems={10} visible={5} first={0} current={1} onChange={() => { /* no op */ }} />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('subset of pages showing, starting at beginning', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Pagination items={100} pageItems={10} visible={5} first={0} current={0} onChange={() => { /* no op */ }} />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('subset of pages showing, showing middle pages', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Pagination items={100} pageItems={10} visible={5} first={2} current={2} onChange={() => { /* no op */ }} />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
  it ('subset of pages showing, showing lastpages', () => {
    const { baseElement } = render (
      <ThemeProvider theme={theme}>
        <Pagination items={100} pageItems={10} visible={5} first={5} current={5} onChange={() => { /* no op */ }} />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
});
