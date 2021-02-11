import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from './Flex';

export const MenuBar = styled (Flex)`
  margin-left: ${({ right }) => (right ? 'auto' : 0)};
  > * {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

MenuBar.propTypes = {
  right: PropTypes.bool,
};

MenuBar.defaultProps = {
  right: false,
};
