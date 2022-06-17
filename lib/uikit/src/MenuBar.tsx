import styled from 'styled-components';
import { Flex, TFlex } from './Flex';

export type TMenuBar = TFlex & {
  right: boolean,
};

export const MenuBar = styled (Flex)<TMenuBar>`
  margin-left: ${({ right }) => (right ? 'auto' : 0)};
  > * {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
