import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

export const DividerStyle = styled (Box)`
  border: ${({ h, pattern, c, tc, theme }) => `
    calc(${h} / 2) ${pattern} ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
  `};
  ${({ extend }) => extend && `
    margin-left: -${extend};
    margin-right: -${extend};
  `};
`;

/**
  Horizontal divider.
*/
export const Divider = props => (
  <DividerStyle {...props} />
);

Divider.propTypes = {
  ...Box.propTypes,
  /** pattern */
  pattern: PropTypes.string,
  /** extend right and left margins, useful for covering padding in container */
  extend: PropTypes.string,
};

Divider.defaultProps = {
  ...Box.defaultProps,
  ...{ h: '1px' },
  ...{ c: '#444444' },
  pattern: 'solid',
  extend: null,
};
