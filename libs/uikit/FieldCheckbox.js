import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GridBoxElement } from './GridBoxElement';
import { FieldInfo } from './FieldInfo';
import { FieldError } from './FieldError';
import { FieldElementStyle } from './FieldElementStyle';
import { Text } from './Text';

const StyledCheckbox = styled.div`
  ${FieldElementStyle}
  background-color: inherit;
  border: 1px solid transparent;
`;

/**
  Checkbox field
*/
export const FieldCheckbox = (
  { field, label, span, row, info, errors, showInfo, showErrors, onChange, onValidate, ...rest }
) => (
  <GridBoxElement span={span} row={row}>
    <StyledCheckbox>
      <input
        type='checkbox'
        {...rest}
        id={field.name}
        name={field.name}
        checked={field.value === true || field.value === 'true'}
        onChange={onChange}
        onBlur={onValidate}
      />
      <Text as='label' htmlFor={field.name}>{label}</Text>
    </StyledCheckbox>
    { showErrors && field.error &&
      <FieldError>
        { (field.error === 'required') ? 'Is required' :
            errors ? (errors[field.error] || 'Error') : 'Error'
        }
      </FieldError>
    }
    { showInfo && (!field.error) && info &&
      <FieldInfo>
        { (info && (info.trim () !== '')) ? info : <span>&nbsp;</span>}
      </FieldInfo>
    }
  </GridBoxElement>
);

FieldCheckbox.propTypes = {
  /** field */
  field: PropTypes.shape ({
    name: PropTypes.string,
    value: PropTypes.oneOfType ([PropTypes.string, PropTypes.bool]),
    required: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  /** label */
  label: PropTypes.string,
  /** span (1 to 12) */
  span: PropTypes.number,
  /** place element on new row */
  row: PropTypes.bool,
  /** info text to show */
  info: PropTypes.string,
  /** list of errors { name: text } */
  errors: PropTypes.shape ({}),
  /** show info flag */
  showInfo: PropTypes.bool,
  /** show errors flag */
  showErrors: PropTypes.bool,
  /** callback for onChange events */
  onChange: PropTypes.func.isRequired,
  /** callback to validated called on onBlur event */
  onValidate: PropTypes.func,
};

FieldCheckbox.defaultProps = {
  span: 12,
  label: '',
  row: false,
  info: null,
  errors: null,
  showInfo: true,
  showErrors: true,
  onValidate: () => { /* no-op */ },
};
