import styled from 'styled-components';

export const Image = styled.img`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || 'auto'};
  object-fit: cover;
`;
