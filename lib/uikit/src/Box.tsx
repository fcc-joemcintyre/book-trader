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

export type TBox = {
  font?: string,
  fs?: string,
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
  h?: string,
  minh?: string,
  maxh?: string,
  w?: string,
  minw?: string,
  maxw?: string,
  c?: string,
  tc?: string,
  bg?: string,
  tbg?: string,
  b?: string,
  br?: string,
  inline?: boolean,
  center?: boolean,
  align?: string,
  cursor?: string,
  overflow?: string,
}

export const Box = styled.div<TBox>`
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
  ${({ m, mt, mb, ml, mr, p, pt, pb, pl, pr, h, maxh, minh, w, maxw, minw,
    c, tc, bg, tbg, b, br, inline, center, align, cursor, overflow, theme }) => `
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
    ${h ? `height: ${h};` : ''}
    ${maxh ? `max-height: ${maxh};` : ''}
    ${minh ? `min-height: ${minh};` : ''}
    ${w ? `width: ${w};` : ''}
    ${maxw ? `max-width: ${maxw};` : ''}
    ${minw ? `min-width: ${minw};` : ''}
    ${c ? `color: ${c};` : ''}
    ${tc && theme.colors[tc] ? `color: ${theme.colors[tc]};` : ''}
    ${bg ? `background-color: ${bg};` : ''}
    ${tbg && theme.colors[tbg] ? `background-color: ${theme.colors[tbg]};` : ''}
    ${b ? `border: ${b};` : ''}
    ${br ? `border-radius: ${br};` : ''}
    ${inline ? 'display: inline-block;' : ''}
    ${center ? `
      margin-left: auto;
      margin-right: auto;
    ` : ''}
    ${align ? `text-align: ${align};` : ''}
    ${cursor ? `cursor: ${cursor};` : ''}
    ${overflow ? `overflow: ${overflow};` : ''}
  `}
`;
