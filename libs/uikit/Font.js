import PropTypes from 'prop-types';
import { css } from 'styled-components';

export const Font = css`
  ${({ theme, font }) => font && ((theme.fonts && theme.fonts[font]) ? theme.fonts[font] :
    theme.fonts && theme.fonts.global ? theme.fonts.global : `
    font-family: sans-serif;
    font-weight: normal;
  `)};
`;

Font.propTypes = {
  font: PropTypes.string,
};

Font.defaultProps = {
  font: null,
};
