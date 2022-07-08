import { css } from 'styled-components';

export type TColors = {
  c?: string,
  tc?: string,
  bg?: string,
  tbg?: string,
};

export const Colors = css<TColors>`
  ${({ c, bg, tc, tbg, theme }) => `
    ${c ? `color: ${c};` : ''}
    ${tc && theme.colors[tc] ? `color: ${theme.colors[tc]};` : ''}
    ${bg ? `background-color: ${bg};` : ''}
    ${tbg && theme.colors[tbg] ? `background-color: ${theme.colors[tbg]};` : ''}
  `}
`;
