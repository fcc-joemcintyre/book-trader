import styled from 'styled-components';
import { Box, TBox } from './Box.js';

export type TGridBoxElement = TBox & {
  span?: number,
  row?: boolean,
};

export const GridBoxElement = styled (Box)<TGridBoxElement>`
  ${({ span, row }) => `
      grid-column-start: ${row ? 1 : 'auto'};
      grid-column-end: span ${span === undefined ? 12 : span};
  `}
`;
