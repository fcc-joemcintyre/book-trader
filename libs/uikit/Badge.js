import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BadgeStyle = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 1px 8px;
  ${({ c, tc, bg, tbg, theme }) => `
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
    background-color: ${(tbg && theme.colors[tbg]) ? theme.colors[tbg] : bg}
  `}
  border-radius: 999px;
`;

/**
  Badge displays content within a pill shaped container, suitable for adding a highlighted value
  to an element. Examples are counters attached to an icon or text label.
*/
export const Badge = props => (
  <BadgeStyle {...props} />
);

Badge.propTypes = {
  /**
    color of the child element (HTML color name or #ffffff format)
  */
  c: PropTypes.string,
  /**
    background color of the Badge (HTML color name or #ffffff format)
  */
  bg: PropTypes.string,
  /**
    theme color name of the child element (lookup into theme.colors.name)
  */
  tc: PropTypes.string,
  /**
    theme background color of the Badge (lookup into theme.colors.name)
  */
  tbg: PropTypes.string,
};

Badge.defaultProps = {
  c: '#ffffff',
  bg: '#ff0000',
  tc: null,
  tbg: null,
};
