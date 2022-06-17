import React from 'react';
import styled from 'styled-components';
import { Field } from '@cygns/use-fields';
import { GridBoxElement } from './GridBoxElement.js';
import { FieldInfo } from './FieldInfo.js';
import { FieldError } from './FieldError.js';
import { FieldLabel } from './FieldLabel.js';
import { FieldElementStyle } from './FieldElementStyle.js';

type Props = {
  field: Field,
  label?: string,
  span?: number,
  row?: boolean,
  info?: string,
  errors?: Record<string, string>,
  showLabel?: boolean,
  showInfo?: boolean,
  showErrors?: boolean,
  onChange: React.ChangeEventHandler,
  onValidate?: React.FocusEventHandler,
};

const StyledInput = styled.input`
  ${FieldElementStyle}
  font-size: 16px;
  padding: 4px;
  outline: 0;
`;

export const FieldInput = ({
  field,
  label = '',
  span = 12,
  row = false,
  info = undefined,
  errors = undefined,
  showLabel = true,
  showInfo = true,
  showErrors = true,
  onChange,
  onValidate = () => { /* no op */ },
  ...rest
}: Props) => {
  const value: string = field.value as string;
  return (
    <GridBoxElement span={span} row={row}>
      {showLabel && <FieldLabel htmlFor={field.name} required={field.required}>{label}</FieldLabel>}
      <StyledInput
        type='text'
        {...rest}
        id={field.name}
        name={field.name}
        value={value}
        error={field.error ? true : false /* eslint-disable-line */}
        onChange={onChange}
        onBlur={onValidate}
      />
      { showErrors && field.error && (
        <FieldError>
          { (field.error === 'required') ? 'Is required' :
            errors ? (errors[field.error] || 'Error') : 'Error'
          }
        </FieldError>
      )}
      { showInfo && (!field.error) && (
        <FieldInfo>
          { (info && (info.trim () !== '')) ? info : <span>&nbsp;</span>}
        </FieldInfo>
      )}
    </GridBoxElement>
  );
};
