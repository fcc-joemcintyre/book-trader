import styled from 'styled-components';
import { Box, TBox } from './Box.js';

export type TButton = TBox & {
  as?: string,
  s?: string,
  v?: string,
  type?: string,
  bc?: string,
  hc?: string,
  hbg?: string,
  hbc?: string,
  dc?: string,
  dbg?: string,
  dbc?: string,
};

export const Button = styled (Box)<TButton>`
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  ${({ theme, v, type }) => {
    let base: string = v && theme.variant[v];
    if (!base) {
      base = type === 'submit' ? theme.variant.buttonSubmit : theme.variant.buttonDefault;
    }
    return base;
  }}
  ${({ theme, s, c, bg, bc, hc, hbg, hbc, dc, dbg, dbc }) => (`
    ${(s && theme.buttonSize[s]) || theme.buttonSize.normal}
    ${c && `color: ${c};`}
    ${bg && `background-color: ${bg};`}
    ${bc && `border-color: ${bc};`}

    &:hover {
      ${hc && `color: ${hc};`}
      ${hbg && `background-color: ${hbg};`}
      ${hbc && `border-color: ${hbc};`}
    }

    &:disabled {
      ${dc && `color: ${dc};`}
      ${dbg && `background-color: ${dbg};`}
      ${dbc && `border-color: ${dbc};`}
    }
  `)}

  ${({ s }) => (s === 'wide') && `
    width: 100%;
  `};
`;
