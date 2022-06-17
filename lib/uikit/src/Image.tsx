import styled from 'styled-components';

export type TImage = {
  inline?: boolean,
  w?: number | string,
  h?: number | string,
};

export const Image = styled.img<TImage>`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || 'auto'};
  object-fit: cover;
`;
