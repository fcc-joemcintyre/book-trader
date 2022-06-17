import styled from 'styled-components';
import { Box, TBox } from './Box.js';

export type TFlex = TBox & {
  column?: boolean,
  wraps?: boolean,
  left?: boolean,
  center?: boolean,
  right?: boolean,
  gap?: string,
};

export const Flex = styled (Box)<TFlex>`
  display: ${({ inline }) => (inline ? 'flex-inline' : 'flex')};
  ${({ column, wraps, left, right, center, gap }) => {
    let l = null;
    let r = null;
    let t = null;
    let b = null;
    if (gap && column) {
      l = wraps && right && gap;
      r = wraps && (!right) && gap;
      t = right && gap;
      b = (!right) && gap;
    } else if (gap) {
      l = right && gap;
      r = (!right) && gap;
      t = wraps && right && gap;
      b = wraps && (!right) && gap;
    }
    return `
      ${l ? `> * { margin-left: ${l}; }` : ''}
      ${r ? `> * { margin-right: ${r}; }` : ''}
      ${t ? `> * { margin-top: ${t}; }` : ''}
      ${b ? `> * { margin-bottom: ${b}; }` : ''}
      ${wraps ? 'flex-wrap: wrap;' : ''}
      ${column ? 'flex-direction: column;' : ''}
      ${(left || right || center) ? `
        justify-content: ${left ? 'flex-start' : right ? 'flex-end' : 'center'};
      ` : ''}
    `;
  }}
`;
