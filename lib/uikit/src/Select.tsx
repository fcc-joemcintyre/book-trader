import styled from 'styled-components';

type Props = {
  c?: string,
  tc?: string,
  bg?: string,
  tbg?: string,
};

export const Select = styled.select<Props>`
  ${({ c, tc, bg, tbg, theme }) => `
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c || '#000000'}
    background-color: ${(tbg && theme.colors[tbg]) ? theme.colors[tbg] : bg || '#ffffff'}
  `}
  padding: 4px;
  padding-right: 20px;
  font-size: 16px;
  border-radius: 4px;
  appearance: none;
  outline: 0;
  background: url("data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16' fill='${({ c }) => c && c.replace ('#', '%23')}'>
      <polygon points='0,4 12,4 6,12'/>
    </svg>") center right no-repeat;
`;
