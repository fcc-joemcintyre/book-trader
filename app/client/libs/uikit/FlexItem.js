import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

export const FlexItem = styled (Box)`
  flex: ${({ grow }) => (grow ? 1 : 0)} ${({ shrink }) => (shrink ? 1 : 0)} ${({ basis }) => basis || 'auto'};
`;

FlexItem.propTypes = {
  ...Box.propTypes,
  grow: PropTypes.bool,
  shrink: PropTypes.bool,
  basis: PropTypes.string,
};

FlexItem.defaultProps = {
  grow: false,
  shrink: false,
  basis: '',
};
