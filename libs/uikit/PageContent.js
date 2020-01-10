import PropTypes from 'prop-types';
import styled from 'styled-components';

export const PageContent = styled.div`
  ${({ theme, maxw, p }) => (`
    max-width: ${maxw || theme.contentWidth || '768px'};
    margin: 0 auto;
    padding: ${p || theme.contentPadding || '0 0 0 0'};
    overflow: auto;
  `)}
`;

PageContent.propTypes = {
  maxw: PropTypes.string,
  p: PropTypes.string,
};

PageContent.defaultProps = {
  maxw: null,
  p: null,
};
