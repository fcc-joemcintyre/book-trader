import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Badge = styled.div`
  display: inline-block;
  padding: 1px 8px;
  ${({ c, tc, bg, tbg, theme }) => `
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c};
    background-color: ${(tbg && theme.colors[tbg]) ? theme.colors[tbg] : bg};
  `}
  border-radius: 999px;
`;

Badge.propTypes = {
  c: PropTypes.string,
  tc: PropTypes.string,
  bg: PropTypes.string,
  tbg: PropTypes.string,
};

Badge.defaultProps = {
  c: '#ffffff',
  tc: null,
  bg: '#ff0000',
  tbg: null,
};
