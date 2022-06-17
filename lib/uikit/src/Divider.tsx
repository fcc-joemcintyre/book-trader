import styled from 'styled-components';
import { Box, TBox } from './Box';

export type TDivider = TBox & {
  extend: string,
};

export const Divider = styled (Box)<TDivider>`
  height: ${({ h }) => h || '1px'};
  background: ${({ c, tc, theme }) => ((tc && theme.colors[tc]) ? theme.colors[tc] : c || '#444444')};
  ${({ extend }) => extend && `
    margin-left: -${extend};
    margin-right: -${extend};
  `};
`;
