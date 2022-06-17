import styled from 'styled-components';
import { Field } from '@cygns/use-fields';
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
  maxLength: number,
  showCount?: boolean,
  info?: string,
  errors?: Record<string, string>,
  showLabel?: boolean,
  showInfo?: boolean,
  showErrors?: boolean,
  onChange: React.ChangeEventHandler,
  onValidate?: React.FocusEventHandler,
};

const StyledTextArea = styled.textarea`
  ${FieldElementStyle}
  resize: none;
  padding: 4px;
  font-size: 16px;
  outline: 0;
`;

export const FieldTextArea = ({
  field,
  label = '',
  span = 12,
  row = false,
  maxLength,
  showCount = true,
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
      <StyledTextArea
        {...rest}
        id={field.name}
        name={field.name}
        maxLength={maxLength}
        value={value}
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
      { (showInfo || showCount) && (!field.error) && (
        <FieldInfo>
          { showCount ? `${value.length} of ${maxLength} characters` :
            (info && (info.trim () !== '')) ? info : <span>&nbsp;</span>
          }
        </FieldInfo>
      )}
    </GridBoxElement>
  );
};
