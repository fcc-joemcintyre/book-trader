import styled from 'styled-components';

export type TMenuSeparator = {
  spacing?: string,
};

export const MenuSeparator = styled.hr<TMenuSeparator>`
  margin: ${({ spacing }) => spacing || '4px'} 4px ${({ spacing }) => spacing || '4px'} 4px;
`;
