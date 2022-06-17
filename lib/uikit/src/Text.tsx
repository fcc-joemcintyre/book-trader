import styled from 'styled-components';

const fontsize: Record<string, { index: number, default: string}> = {
  xxsmall: { index: 0, default: '11px' },
  xsmall: { index: 1, default: '12px' },
  small: { index: 2, default: '14px' },
  normal: { index: 3, default: '16px' },
  large: { index: 4, default: '18px' },
  xlarge: { index: 5, default: '22px' },
  xxlarge: { index: 6, default: '26px' },
};

export type TText = {
  font?: string,
  fs?: string,
  c?: string,
  tc?: string,
  bg?: string,
  tbg?: string,
  m?: string,
  mt?: string,
  mb?: string,
  ml?: string,
  mr?: string,
  p?: string,
  pt?: string,
  pb?: string,
  pl?: string,
  pr?: string,
  minh?: string,
  cursor?: string,
  truncate?: boolean,
  left?: boolean,
  center?: boolean,
  right?: boolean,
};

export const Text = styled.div<TText>`
  ${({ theme, font }) => font && ((theme.fonts && theme.fonts[font]) ? theme.fonts[font] :
    theme.fonts && theme.fonts.global ? theme.fonts.global : `
    font-family: sans-serif;
    font-weight: normal;
  `)};
  ${({ theme, fs }) => (fs && fontsize[fs] ? `
    font-size: ${(theme.fontSize && theme.fontSize[fontsize[fs].index]) || fontsize[fs].default};
  ` : fs && `
    font-size: ${fs};
  `)};
  ${({ c, bg, tc, tbg, m, mt, mb, ml, mr, p, pt, pb, pl, pr, minh, cursor, truncate, theme }) => `
    ${c ? `color: ${c};` : ''}
    ${tc && theme.colors[tc] ? `color: ${theme.colors[tc]};` : ''}
    ${bg ? `background-color: ${bg};` : ''}
    ${tbg && theme.colors[tbg] ? `background-color: ${theme.colors[tbg]};` : ''}
    ${m ? `margin: ${m};` : ''}
    ${mt ? `margin-top: ${mt};` : ''}
    ${mb ? `margin-bottom: ${mb};` : ''}
    ${ml ? `margin-left: ${ml};` : ''}
    ${mr ? `margin-right: ${mr};` : ''}
    ${p ? `padding: ${p};` : ''}
    ${pt ? `padding-top: ${pt};` : ''}
    ${pb ? `padding-bottom: ${pb};` : ''}
    ${pl ? `padding-left: ${pl};` : ''}
    ${pr ? `padding-right: ${pr};` : ''}
    ${minh ? `min-height: ${minh};` : ''}
    ${cursor ? `cursor: ${cursor};` : ''}
    ${truncate ? `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    ` : ''}
  `}
  text-align: ${({ center, right, left }) => (center ? 'center' : right ? 'right' : left ? 'left' : null)};
`;
