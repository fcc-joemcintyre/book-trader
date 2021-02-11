import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Anchor = ({ to, children, ...props }) => (
  <a
    href={to}
    target='_blank'
    rel='noopener noreferrer'
    {...props}
  >
    {children}
  </a>
);

Anchor.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const LinkExternal = styled (Anchor)`
  ${({ c, tc, theme }) => `
    text-decoration: none;
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c};
    &:visited: {
      color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
    }
  `}
`;

LinkExternal.propTypes = {
  ...Anchor.propTypes,
  c: PropTypes.string,
  tc: PropTypes.string,
};

LinkExternal.defaultProps = {
  c: null,
  tc: null,
};
