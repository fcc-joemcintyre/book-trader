import styled from 'styled-components';

export type TButton = {
  variant?: 'solid' | 'outline',
  type: 'button' | 'submit',
  size?: 'xs' | 'sm' | 'md' | 'lg',
  fullWidth?: boolean,
  colors?: {
    text?: string,
    bg?: string,
    border?: string,
    hover?: string,
    disabled?: string,
  }
};

export const Button = styled.button<TButton>`
  ${({ theme, variant, type }) => {
    let base: string = variant && theme.variant[variant];
    if (!base) {
      base = type === 'submit' ? theme.variant.buttonSubmit : theme.variant.buttonDefault;
    }
    return base;
  }}
  ${({ theme, size }) => (theme.buttonSize[size || 'md'])}}

  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;

  ${({ fullWidth, colors }) => (`
    ${colors?.text && `color: ${colors.text};`}
    ${colors?.bg && `color: ${colors.bg};`}
    ${colors?.border && `border-color: ${colors.border};`}

    &:hover {
      ${colors?.hover && `background-color: ${colors.hover}};`}
    }

    &:disabled {
      ${colors?.disabled && `background-color: ${colors.disabled};`}
    }

    ${(fullWidth && 'width: 100%')}
  `)}
`;
