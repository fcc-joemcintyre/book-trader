import styled from 'styled-components';

export type TBadge = {
  c?: string,
  tc?: string,
  bg?: string,
  tbg?: string,
};

export const Badge = styled.div<TBadge>`
  display: inline-block;
  padding: 1px 8px;
  ${({ c, tc, bg, tbg, theme }) => `
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c || '#ffffff'};
    background-color: ${(tbg && theme.colors[tbg]) ? theme.colors[tbg] : bg || '#0000ff'};
  `}
  border-radius: 999px;
`;
