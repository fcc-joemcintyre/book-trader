import { css } from 'styled-components';

export type TFieldElementStyle = {
  error?: boolean,
};

export const FieldElementStyle = css<TFieldElementStyle>`
  ${({ theme, error }) => `
    display: block;
    margin: 0;
    width: 100%;
    font-size: ${(theme && theme.fontSize && theme.fontSize[3]) || '16px'};
    background-color: #f0f0f0;
    border-radius: 4px;
    outline: 0;
    ${(error ? `
      border: 1px solid ${(theme && theme.fieldErrorBG) || 'red'};
      ${theme && theme.fieldError && `
        border-radius: 4px 4px 0 0;
      `}
    ` : `
      border: 1px solid #f0f0f0;

      &:focus {
        border-color: ${theme.fieldFocusColor || 'blue'};
      }
    `)}
  `}

  ${({ theme }) => theme && theme.fieldElement}
`;
