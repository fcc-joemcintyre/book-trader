import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

const sizes = {
  small: `
    font-size: 12px;
    padding: 2px 4px;
  `,
  normal: `
    font-size: 16px;
    padding: 4px 8px;
  `,
  large: `
    font-size: 16px;
    padding: 6px 12px;
  `,
  wide: `
    width: 100%;
    font-size: 16px;
    padding: 6px 12px;
  `,
};

const ButtonStyle = styled (Box)`
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  ${({ s }) => sizes[s] || sizes.normal}
  ${({ theme, type }) => (type === 'submit' ? theme.variant.buttonSubmit : theme.variant.buttonDefault)}
  ${({ c, bg, bc, hc, hbg, hbc, dc, dbg, dbc }) => (`
    ${c && `color: ${c};`}
    ${bg && `background-color: ${bg};`}
    ${bc && `border-color: ${bc};`}

    &:hover {
      ${hc && `color: ${hc};`}
      ${hbg && `background-color: ${hbg};`}
      ${hbc && `border-color: ${hbc};`}
    }

    &:disabled {
      ${dc && `color: ${dc};`}
      ${dbg && `background-color: ${dbg};`}
      ${dbc && `border-color: ${dbc};`}
    }
  `)}
`;

/**
  Button, using theme variants for submit and button types. Supports all Box
  properties, plus Button specific properties.
*/
export const Button = props => (
  <ButtonStyle {...props} />
);

Button.propTypes = {
  ...Box.propTypes,
  /** render as, default button */
  as: PropTypes.oneOfType ([PropTypes.string, PropTypes.node]),
  /** size (small, normal, large, wide) */
  s: PropTypes.string,
  /** border-color */
  bc: PropTypes.string,
  /** hover color */
  hc: PropTypes.string,
  /** hover background-color */
  hbg: PropTypes.string,
  /** hover border-color */
  hbc: PropTypes.string,
  /** disabled color */
  dc: PropTypes.string,
  /** disabled background-color */
  dbg: PropTypes.string,
  /** disabled border-color */
  dbc: PropTypes.string,
};

Button.defaultProps = {
  ...Box.defaultProps,
  as: 'button',
  s: 'normal',
  bc: null,
  hc: null,
  hbg: null,
  hbc: null,
  dc: null,
  dbg: null,
  dbc: null,
};
