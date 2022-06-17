import styled from 'styled-components';

export type TPageContent = {
  maxw?: string,
  p?: string,
};

export const PageContent = styled.div<TPageContent>`
  ${({ theme, maxw, p }) => (`
    max-width: ${maxw || theme.contentWidth || '768px'};
    margin: 0 auto;
    padding: ${p || theme.contentPadding || '0 0 0 0'};
    overflow: auto;
  `)}
`;
