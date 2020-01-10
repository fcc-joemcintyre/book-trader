import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Anchor = ({ to, children, ...props }) => (
  <a
    href={to}
    {...props}
  >
    {children}
  </a>
);

Anchor.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const LinkInternal = styled (Anchor)`
  ${({ c, tc, theme }) => `
    text-decoration: none;
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c};
    &:visited: {
      color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
    }
  `}
`;

LinkInternal.propTypes = {
  ...Anchor.propTypes,
  c: PropTypes.string,
  tc: PropTypes.string,
};

LinkInternal.defaultProps = {
  c: null,
  tc: null,
};
