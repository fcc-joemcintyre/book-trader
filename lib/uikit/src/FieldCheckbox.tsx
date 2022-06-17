import styled from 'styled-components';
import { Field } from '@cygns/use-fields';
import { GridBoxElement } from './GridBoxElement';
import { FieldInfo } from './FieldInfo';
import { FieldError } from './FieldError';
import { FieldElementStyle } from './FieldElementStyle';
import { Text } from './Text';

export type Props = {
  field: Field,
  label?: string,
  span?: number,
  row?: boolean,
  info?: string,
  errors?: Record<string, string>,
  showInfo?: boolean,
  showErrors?: boolean,
  onChange: React.ChangeEventHandler,
  onValidate?: React.FocusEventHandler,
};

const StyledCheckbox = styled.div`
  ${FieldElementStyle}
  background-color: inherit;
  border: 1px solid transparent;
`;

export const FieldCheckbox = ({
  field,
  label = '',
  span = 12,
  row = false,
  info = undefined,
  errors = undefined,
  showInfo = true,
  showErrors = true,
  onChange,
  onValidate = () => { /* no op */ },
  ...rest
}: Props) => (
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
    { showErrors && field.error && (
      <FieldError>
        { (field.error === 'required') ? 'Is required' :
            errors ? (errors[field.error] || 'Error') : 'Error'
        }
      </FieldError>
    )}
    { showInfo && (!field.error) && info && (
      <FieldInfo>
        { (info && (info.trim () !== '')) ? info : <span>&nbsp;</span>}
      </FieldInfo>
    )}
  </GridBoxElement>
);
