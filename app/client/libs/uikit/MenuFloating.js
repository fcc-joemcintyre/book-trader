import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MenuItem } from './MenuItem';

export const MenuFloating = styled.div`
  position: absolute;
  z-index: 20;
  top: calc(100% + ${({ top }) => top});
  ${({ right }) => (right ? `
    left: null;
    right: 0;
  ` : `
    left: 0;
    right: null;
  `)}

  border: 1px solid #333333;
  border-top: transparent;

  ${({ theme }) => `
    color: ${theme.colors.navText};
    background-color: ${theme.colors.navColor}
  `}

  > ${MenuItem} {
    padding: 6px 20px;
  }

  > a {
    display: block;
    margin: 0;
    width: 100%;
    overflow: hidden;
    padding: 6px 20px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.navHoverColor};
    }
  }
`;

MenuFloating.propTypes = {
  top: PropTypes.string,
  right: PropTypes.bool,
};

MenuFloating.defaultProps = {
  top: '8px',
  right: false,
};
