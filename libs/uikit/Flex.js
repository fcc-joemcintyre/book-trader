import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

export const Flex = styled (Box)`
  display: ${({ inline }) => (inline ? 'flex-inline' : 'flex')};
  ${({ column, wraps, left, right, center, gap }) => {
    let l = null;
    let r = null;
    let t = null;
    let b = null;
    if (gap && column) {
      l = wraps && right && gap;
      r = wraps && (!right) && gap;
      t = right && gap;
      b = (!right) && gap;
    } else if (gap) {
      l = right && gap;
      r = (!right) && gap;
      t = wraps && right && gap;
      b = wraps && (!right) && gap;
    }
    return `
      ${l ? `> * { margin-left: ${l}; }` : ''}
      ${r ? `> * { margin-right: ${r}; }` : ''}
      ${t ? `> * { margin-top: ${t}; }` : ''}
      ${b ? `> * { margin-bottom: ${b}; }` : ''}
      ${wraps ? 'flex-wrap: wrap;' : ''}
      ${column ? 'flex-direction: column;' : ''}
      ${(left || right || center) ? `
        justify-content: ${left ? 'flex-start' : right ? 'flex-end' : 'center'};
      ` : ''}
    `;
  }}
`;

Flex.propTypes = {
  ...Box.propTypes,
  column: PropTypes.bool,
  wraps: PropTypes.bool,
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  gap: PropTypes.string,
};

Flex.defaultProps = {
  column: false,
  wraps: false,
  left: false,
  center: false,
  right: false,
  gap: null,
};
