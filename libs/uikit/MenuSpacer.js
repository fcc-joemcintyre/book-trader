import styled from 'styled-components';

export const MenuSpacer = styled.div`
  position: absolute;
  z-index: 20;
  top: 100%;
  left: ${props => (props.right ? null : 0)};
  right: ${props => (props.right ? 0 : null)};
  width: 100%;
  min-width: 100px;
  height: ${props => (props.h || '8px')};
`;
