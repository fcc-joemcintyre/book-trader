import styled from 'styled-components';
import { Colors, TColors } from './sharedStyles.js';

export type TButton = TColors & {
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

export const Button = styled.button<TButton>`
  ${({ theme, v, type }) => {
    let base: string = v && theme.variant[v];
    if (!base) {
      base = type === 'submit' ? theme.variant.buttonSubmit : theme.variant.buttonDefault;
    }
    return base;
  }}

  ${Colors}

  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  ${({ theme, s, bc, hc, hbg, hbc, dc, dbg, dbc }) => (`
    ${(s && theme.buttonSize[s]) || theme.buttonSize.normal}
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
