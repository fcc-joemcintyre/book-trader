import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

export const Button = styled (Box)`
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  ${({ theme, v, type }) => {
    let base = v && theme.variant[v];
    if (!base) {
      base = type === 'submit' ? theme.variant.buttonSubmit : theme.variant.buttonDefault;
    }
    return base;
  }}
  ${({ theme, s, c, bg, bc, hc, hbg, hbc, dc, dbg, dbc }) => (`
    ${(s && theme.buttonSize[s]) || theme.buttonSize.normal}
    ${c && `color: ${c};`}
    ${bg && `background-color: ${bg};`}
    ${bc && `border-color: ${bc};`}

    &:hover {
      ${hc && `color: ${hc};`}
      ${hbg && `background-color: ${hbg};`}
      ${hbc && `border-color: ${hbc};`}
    }

    &:disabled {
      ${dc && `color: ${dc};`}
      ${dbg && `background-color: ${dbg};`}
      ${dbc && `border-color: ${dbc};`}
    }
  `)}

  ${({ s }) => (s === 'wide') && `
    width: 100%;
  `};
`;

Button.propTypes = {
  as: PropTypes.oneOfType ([PropTypes.string, PropTypes.node]),
  v: PropTypes.string,
  s: PropTypes.string,
  c: PropTypes.string,
  bg: PropTypes.string,
  bc: PropTypes.string,
  hc: PropTypes.string,
  hbg: PropTypes.string,
  hbc: PropTypes.string,
  dc: PropTypes.string,
  dbg: PropTypes.string,
  dbc: PropTypes.string,
};

Button.defaultProps = {
  as: 'button',
  v: null,
  s: 'normal',
  c: null,
  bg: null,
  bc: null,
  hc: null,
  hbg: null,
  hbc: null,
  dc: null,
  dbg: null,
  dbc: null,
};
