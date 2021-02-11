import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GridBoxElement } from './GridBoxElement';
import { FieldInfo } from './FieldInfo';
import { FieldError } from './FieldError';
import { FieldLabel } from './FieldLabel';
import { FieldElementStyle } from './FieldElementStyle';

const StyledInput = styled.input`
  ${FieldElementStyle}
  font-size: 16px;
  padding: 4px;
  outline: 0;
`;

export const FieldInput = (
  { field, label, span, row, info, errors, showLabel, showInfo, showErrors, onChange, onValidate, ...rest }
) => (
  <GridBoxElement span={span} row={row} error={errors}>
    {showLabel && <FieldLabel htmlFor={field.name} required={field.required}>{label}</FieldLabel>}
    <StyledInput
      type='text'
      {...rest}
      id={field.name}
      name={field.name}
      value={field.value}
      error={field.error}
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
    { showInfo && (!field.error) &&
      <FieldInfo>
        { (info && (info.trim () !== '')) ? info : <span>&nbsp;</span>}
      </FieldInfo>
    }
  </GridBoxElement>
);

FieldInput.propTypes = {
  field: PropTypes.shape ({
    name: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  span: PropTypes.number,
  row: PropTypes.bool,
  info: PropTypes.string,
  errors: PropTypes.shape ({}),
  showLabel: PropTypes.bool,
  showInfo: PropTypes.bool,
  showErrors: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
};

FieldInput.defaultProps = {
  label: null,
  span: 12,
  row: false,
  info: null,
  errors: null,
  showLabel: true,
  showInfo: true,
  showErrors: true,
  onValidate: () => { /* no-op */ },
};
