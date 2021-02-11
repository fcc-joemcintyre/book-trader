import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GridBoxElement } from './GridBoxElement';
import { FieldInfo } from './FieldInfo';
import { FieldError } from './FieldError';
import { FieldLabel } from './FieldLabel';
import { FieldElementStyle } from './FieldElementStyle';

const StyledTextArea = styled.textarea`
  ${FieldElementStyle}
  resize: none;
  padding: 4px;
  font-size: 16px;
  outline: 0;
`;

export const FieldTextArea = ({
  field, label, span, row, maxLength, showCount, info, errors, showLabel, showInfo, showErrors,
  onChange, onValidate, ...rest
}) => (
  <GridBoxElement span={span} row={row}>
    {showLabel && <FieldLabel htmlFor={field.name} required={field.required}>{label}</FieldLabel>}
    <StyledTextArea
      {...rest}
      id={field.name}
      name={field.name}
      maxLength={maxLength}
      value={field.value}
      onChange={onChange}
      onBlur={onValidate}
    />
    { showErrors && field.error &&
      <FieldError>
        { (field.error === 'required') ? 'Is required' :
          errors ? (errors[field.error] || 'Error') : 'Error'
        }
      </FieldError>
    }
    { (showInfo || showCount) && (!field.error) &&
      <FieldInfo>
        { showCount ? `${field.value.length} of ${maxLength} characters` :
          (info && (info.trim () !== '')) ? info : <span>&nbsp;</span>
        }
      </FieldInfo>
    }
  </GridBoxElement>
);

FieldTextArea.propTypes = {
  field: PropTypes.shape ({
    name: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  span: PropTypes.number,
  row: PropTypes.bool,
  maxLength: PropTypes.number.isRequired,
  showCount: PropTypes.bool,
  info: PropTypes.string,
  errors: PropTypes.shape ({}),
  showLabel: PropTypes.bool,
  showInfo: PropTypes.bool,
  showErrors: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
};

FieldTextArea.defaultProps = {
  label: null,
  span: 12,
  row: false,
  showCount: false,
  info: null,
  errors: null,
  showLabel: true,
  showInfo: true,
  showErrors: true,
  onValidate: () => { /* no-op */ },
};
