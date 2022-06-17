import styled from 'styled-components';

export const FieldError = styled.div`
  ${({ theme }) => (theme && theme.fieldError ? theme.fieldError : `
    font-size: 14px;
    padding: 3px 8px;
    color: red;
  `)}
`;
