import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

export const GridBox = styled (Box)`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: ${({ gap }) => gap};
`;

GridBox.propTypes = {
  ...Box.propTypes,
  gap: PropTypes.string,
};

GridBox.defaultProps = {
  gap: '10px',
};
