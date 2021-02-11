import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Select = styled.select`
  ${({ c, tc, bg, tbg, theme }) => `
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
    background-color: ${(tbg && theme.colors[tbg]) ? theme.colors[tbg] : bg}
  `}
  padding: 4px;
  padding-right: 20px;
  font-size: 16px;
  border-radius: 4px;
  appearance: none;
  outline: 0;
  background: url("data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16' fill='${props => props.c.replace ('#', '%23')}'>
      <polygon points='0,4 12,4 6,12'/>
    </svg>") center right no-repeat;
`;

Select.propTypes = {
  c: PropTypes.string,
  tc: PropTypes.string,
  bg: PropTypes.string,
  tbg: PropTypes.string,
};

Select.defaultProps = {
  c: '#000000',
  tc: null,
  bg: '#ffffff',
  tbg: null,
};
