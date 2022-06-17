import { css } from 'styled-components';

type Props = {
  font: string,
};

export const Font = css<Props>`
  ${({ theme, font }) => font && ((theme.fonts && theme.fonts[font]) ? theme.fonts[font] :
    theme.fonts && theme.fonts.global ? theme.fonts.global : `
    font-family: sans-serif;
    font-weight: normal;
  `)};
`;
