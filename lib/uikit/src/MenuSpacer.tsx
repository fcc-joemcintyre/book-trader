import styled from 'styled-components';

export type TMenuSpacer = {
  right?: boolean,
  h?: string,
};

export const MenuSpacer = styled.div<TMenuSpacer>`
  position: absolute;
  z-index: 20;
  top: 100%;
  left: ${({ right }) => (right ? null : 0)};
  right: ${({ right }) => (right ? 0 : null)};
  width: 100%;
  min-width: 100px;
  height: ${({ h }) => (h || '8px')};
`;
