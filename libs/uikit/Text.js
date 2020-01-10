import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Font } from './Font';
import { FontSize } from './FontSize';

export const Text = styled.div`
  ${Font}
  ${FontSize}
  ${({ c, bg, tc, tbg, m, mt, mb, ml, mr, p, pt, pb, pl, pr, minh, cursor, truncate, theme }) => `
    ${c ? `color: ${c};` : ''}
    ${tc && theme.colors[tc] ? `color: ${theme.colors[tc]}` : ''}
    ${bg ? `background-color: ${bg};` : ''}
    ${tbg && theme.colors[tbg] ? `background-color: ${theme.colors[tbg]}` : ''}
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
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : props.left ? 'left' : null)};
`;

Text.propTypes = {
  c: PropTypes.string,
  tc: PropTypes.string,
  bg: PropTypes.string,
  tbg: PropTypes.string,
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
  minh: PropTypes.string,
  cursor: PropTypes.string,
  truncate: PropTypes.bool,
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

Text.defaultProps = {
  c: null,
  tc: null,
  bg: null,
  tbg: null,
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
  minh: null,
  cursor: null,
  truncate: false,
  left: false,
  center: false,
  right: false,
};
