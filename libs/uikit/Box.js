import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Font } from './Font';
import { FontSize } from './FontSize';

export const Box = styled.div`
  ${Font}
  ${FontSize}
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

Box.propTypes = {
  m: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  p: PropTypes.string,
  pt: PropTypes.string,
  pb: PropTypes.string,
  pl: PropTypes.string,
  pr: PropTypes.string,
  h: PropTypes.string,
  minh: PropTypes.string,
  maxh: PropTypes.string,
  w: PropTypes.string,
  minw: PropTypes.string,
  maxw: PropTypes.string,
  c: PropTypes.string,
  tc: PropTypes.string,
  bg: PropTypes.string,
  tbg: PropTypes.string,
  b: PropTypes.string,
  br: PropTypes.string,
  inline: PropTypes.bool,
  center: PropTypes.bool,
  align: PropTypes.string,
  cursor: PropTypes.string,
  overflow: PropTypes.string,
};

Box.defaultProps = {
  m: null,
  mt: null,
  mb: null,
  ml: null,
  mr: null,
  p: null,
  pt: null,
  pb: null,
  pl: null,
  pr: null,
  h: null,
  minh: null,
  maxh: null,
  w: null,
  minw: null,
  maxw: null,
  c: null,
  tc: null,
  bg: null,
  tbg: null,
  b: null,
  br: null,
  inline: null,
  center: null,
  align: null,
  cursor: null,
  overflow: null,
};
