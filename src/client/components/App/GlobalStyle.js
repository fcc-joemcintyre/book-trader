import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Lato, sans-serif;
    font-size: 16px;
    line-height: 1.2;
    min-width: 300px;
    margin: 0;
    padding: 0;
  }

  input, select {
    font-size: 16px;
  }

  h1 {
    font-family: Merriweather, sans-serif;
    font-size: 28px;
    font-weight: 400;
  }

  h2 {
    font-family: Lato, sans-serif;
    font-size: 24px;
    font-weight: 400;
  }

  h3 {
    font-family: Lato, sans-serif;
    font-size: 20px;
    font-weight: 400;
  }
`;
