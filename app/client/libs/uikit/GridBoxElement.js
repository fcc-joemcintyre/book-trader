import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

export const GridBoxElement = styled (Box)`
  ${({ span, row }) => `
      grid-column-start: ${row ? 1 : 'auto'};
      grid-column-end: span ${span};
  `}
`;

GridBoxElement.propTypes = {
  ...Box.propTypes,
  span: PropTypes.number,
  row: PropTypes.bool,
};

GridBoxElement.defaultProps = {
  span: 12,
  row: false,
};
