import styled from 'styled-components';

type Props = {
  required?: boolean,
};

export const FieldLabel = styled.label<Props>`
  ${({ theme }) => ((theme && theme.fieldLabel) ? theme.fieldLabel : `
    display: block;
    margin-bottom: 4px;
    font-size: ${(theme && theme.fontSize && theme.fontSize[2]) || '14px'};
    overflow: hidden;
  `)}

  &:after {
    content: ${({ required }) => required && '" *"'};
  }
`;
