import { Field } from '@cygns/use-fields';
import { FieldLabel } from './FieldLabel';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  field: Field,
  type?: string,
  label?: string,
  info?: string,
  errors?: Record<string, string>,
  showLabel?: boolean,
  showInfo?: boolean,
  showErrors?: boolean,
  onChange: React.ChangeEventHandler,
  onValidate?: React.FocusEventHandler,
};

export const FieldInput = ({
  field,
  type = 'text',
  label = '',
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
  const border = field.error ? 'border-red-500' : 'border-gray-100';
  return (
    <div>
      {showLabel && <FieldLabel htmlFor={field.name} required={field.required}>{label}</FieldLabel>}
      <input
        className={`block w-full m-0 p-1 bg-gray-100 rounded-sm outline-0 border ${border} focus:border-blue-500`}
        type={type}
        {...rest}
        id={field.name}
        name={field.name}
        value={value}
        onChange={onChange}
        onBlur={onValidate}
      />
      { showErrors && field.error && (
        <div className='text-sm text-red-500 py-1 px-2'>
          { (field.error === 'required') ? 'Is required' :
            errors ? (errors[field.error] || 'Error') : 'Error'
          }
        </div>
      )}
      { showInfo && (!field.error) && (
        <div className='text-sm text-gray-700 py-1 px-2'>
          { (info && (info.trim () !== '')) ? info : <span>&nbsp;</span>}
        </div>
      )}
    </div>
  );
};
