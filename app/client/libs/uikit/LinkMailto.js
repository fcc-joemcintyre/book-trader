import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Anchor = ({ to, subject, children, ...props }) => (
  <a
    href={`mailto:${to}${subject ? `?subject=${subject}` : ''}`}
    {...props}
  >
    {children}
  </a>
);

Anchor.propTypes = {
  to: PropTypes.string.isRequired,
  subject: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Anchor.defaultProps = {
  subject: null,
};

export const LinkMailto = styled (Anchor)`
  ${({ c, tc, theme }) => `
    text-decoration: none;
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c};
    &:visited: {
      color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
    }
  `}
`;

LinkMailto.propTypes = {
  ...Anchor.propTypes,
  c: PropTypes.string,
  tc: PropTypes.string,
};

LinkMailto.defaultProps = {
  ...Anchor.defaultProps,
  c: null,
  tc: null,
};
