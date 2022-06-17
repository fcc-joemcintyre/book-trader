import styled from 'styled-components';

export const MenuItem = styled.div`
  position: relative;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  ${({ theme }) => `
    color: ${theme.colors.navText};
    background-color: ${theme.colors.navColor};
    &:hover {
      color: ${theme.colors.navHoverText};
      background-color: ${theme.colors.navHoverColor};
    }
    &.active {
      color: ${theme.colors.navActiveText};
    }
  `}
`;
