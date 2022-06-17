import styled from 'styled-components';
import { Box, TBox } from './Box';

export type TGridBox = TBox & {
  gap?: string,
};

export const GridBox = styled (Box)<TGridBox>`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: ${({ gap }) => gap || '10px'};
`;
