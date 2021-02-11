import PropTypes from 'prop-types';
import styled from 'styled-components';

export const FieldLabel = styled.label`
  ${({ theme }) => ((theme && theme.fieldLabel) ? theme.fieldLabel : `
    display: block;
    margin-bottom: 4px;
    font-size: ${(theme && theme.fontSize && theme.fontSize[2]) || '14px'};
    overflow: hidden;
  `)}

  &:after {
    content: ${({ required }) => required && '" *"'};
  }
`;

FieldLabel.propTypes = {
  required: PropTypes.bool,
};

FieldLabel.defaultProps = {
  required: false,
};
