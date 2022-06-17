import styled from 'styled-components';
import { Field } from '@cygns/use-fields';
import { Select } from './Select';
import { GridBoxElement } from './GridBoxElement';
import { FieldInfo } from './FieldInfo';
import { FieldError } from './FieldError';
import { FieldLabel } from './FieldLabel';
import { FieldElementStyle } from './FieldElementStyle';

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

const StyledSelect = styled (Select)`
  ${FieldElementStyle}
`;

export const FieldSelect = ({
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
      <StyledSelect
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
