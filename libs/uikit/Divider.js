import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

export const Divider = styled (Box)`
  height: ${props => props.h};
  background: ${({ c, tc, theme }) => ((tc && theme.colors[tc]) ? theme.colors[tc] : c)};
  ${({ extend }) => extend && `
    margin-left: -${extend};
    margin-right: -${extend};
  `};
`;

Divider.propTypes = {
  ...Box.propTypes,
  extend: PropTypes.string,
};

Divider.defaultProps = {
  h: '1px',
  c: '#444444',
  extend: null,
};
