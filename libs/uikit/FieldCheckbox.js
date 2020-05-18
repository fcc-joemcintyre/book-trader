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
  field: PropTypes.shape ({
    name: PropTypes.string,
    value: PropTypes.oneOfType ([PropTypes.string, PropTypes.bool]),
    required: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  span: PropTypes.number,
  row: PropTypes.bool,
  info: PropTypes.string,
  errors: PropTypes.shape ({}),
  showInfo: PropTypes.bool,
  showErrors: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
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
