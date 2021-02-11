import styled from 'styled-components';

export const FieldInfo = styled.div`
  ${({ theme }) => (theme && theme.fieldInfo ? theme.fieldInfo : `
    font-size: 14px;
    padding: 3px 8px;
  `)}
`;
