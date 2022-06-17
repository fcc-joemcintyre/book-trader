import styled from 'styled-components';
import { MenuItem } from './MenuItem';

export type TMenuFloating = {
  top?: string,
  right?: boolean,
};

export const MenuFloating = styled.div<TMenuFloating>`
  position: absolute;
  z-index: 20;
  top: calc(100% + ${({ top }) => top || '8px'});
  ${({ right }) => (right ? `
    left: null;
    right: 0;
  ` : `
    left: 0;
    right: null;
  `)}

  border: 1px solid #333333;
  border-top: transparent;

  ${({ theme }) => `
    color: ${theme.colors.navText};
    background-color: ${theme.colors.navColor}
  `}

  > ${MenuItem} {
    padding: 6px 20px;
  }

  > a {
    display: block;
    margin: 0;
    width: 100%;
    overflow: hidden;
    padding: 6px 20px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.navHoverColor};
    }
  }
`;
