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
        <Pagination items={20} pageItems={10} visible={5} first={1} current={1} onChange={() => { /* no op */ }} />
      </ThemeProvider>
    );
    expect (baseElement).toMatchSnapshot ();
  });
});
