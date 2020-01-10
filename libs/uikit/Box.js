import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Font } from './Font';
import { FontSize } from './FontSize';

const BoxStyle = styled.div`
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
    ${tc && theme.colors[tc] ? `color: ${theme.colors[tc]}` : ''}
    ${bg ? `background-color: ${bg};` : ''}
    ${tbg && theme.colors[tbg] ? `background-color: ${theme.colors[tbg]}` : ''}
    ${b ? `border: ${b};` : ''}
    ${br ? `border-radius: ${br};` : ''}
    ${inline ? 'display: inline-block;' : ''}
    ${center ? `
      margin-left: auto;
      margin-right: auto;
    ` : ''}
    ${align ? `text-align: ${align};` : ''}
    ${cursor ? `cursor: ${cursor};` : ''}
    ${overflow ? `overflow: ${overflow}` : ''}
  `}
`;

/**
  Box is the base container element, and may be used itself, or as the basis for
  creating other containers (such as Flex and GridBox).
*/
export const Box = props => (
  <BoxStyle {...props} />
);

Box.propTypes = {
  /** margin: all margins */
  m: PropTypes.string,
  /** margin-top */
  mt: PropTypes.string,
  /** margin-bottom */
  mb: PropTypes.string,
  /** margin-left */
  ml: PropTypes.string,
  /** margin-right */
  mr: PropTypes.string,
  /** padding: all padding */
  p: PropTypes.string,
  /** padding-top */
  pt: PropTypes.string,
  /** padding-bottom */
  pb: PropTypes.string,
  /** padding-left */
  pl: PropTypes.string,
  /** padding-right */
  pr: PropTypes.string,
  /** height */
  h: PropTypes.string,
  /** min-height */
  minh: PropTypes.string,
  /** max-height */
  maxh: PropTypes.string,
  /** width */
  w: PropTypes.string,
  /** min-width */
  minw: PropTypes.string,
  /** max-width */
  maxw: PropTypes.string,
  /** color */
  c: PropTypes.string,
  /** background-color */
  bg: PropTypes.string,
  /* theme color (from theme.colors) */
  tc: PropTypes.string,
  /* theme background-color (from theme.colors) */
  tbg: PropTypes.string,
  /** border */
  b: PropTypes.string,
  /** border-radius */
  br: PropTypes.string,
  /** display inline-block */
  inline: PropTypes.bool,
  /** center this Box in its parent container */
  center: PropTypes.bool,
  /** align elements within this Box (left, center, right) */
  align: PropTypes.string,
  /** cursor */
  cursor: PropTypes.string,
  /** overflow */
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
  bg: null,
  tc: null,
  tbg: null,
  b: null,
  br: null,
  inline: null,
  center: null,
  align: null,
  cursor: null,
  overflow: null,
};
