import styled from 'styled-components';
import { Box, TBox } from './Box.js';

export type TFlexItem = TBox & {
  grow?: boolean,
  shrink?: boolean,
  basis?: string,
};

export const FlexItem = styled (Box)<TFlexItem>`
  flex: ${({ grow }) => (grow ? 1 : 0)} ${({ shrink }) => (shrink ? 1 : 0)} ${({ basis }) => basis || 'auto'};
`;
